from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Company, Event, Buy
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_bcrypt import Bcrypt
import stripe
import os
from .models import db, Buy

api = Blueprint('api', __name__)
bcrypt = Bcrypt() 

CORS(api)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@api.route('/registro-empresa', methods=['POST'])
def registrar_empresa():
    body = request.get_json()
    if not body:
        return jsonify({"msg": "Falta el cuerpo de la petición"}), 400
    
    required = ['nombre_legal', 'cif_nif', 'email', 'password']
    for field in required:
        if field not in body:
            return jsonify({"msg": f"Falta el campo: {field}"}), 400

    if Company.query.filter_by(email=body['email']).first():
        return jsonify({"msg": "El email ya está registrado"}), 400
    
    hashed_password = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    
    new_company = Company(
        nombre_legal=body['nombre_legal'],
        cif_nif=body['cif_nif'],
        email=body['email'],
        password=hashed_password
    )
    
    db.session.add(new_company)
    db.session.commit()
    
    return jsonify({"msg": "Empresa registrada con éxito", "company": new_company.serialize()}), 201

@api.route('/event', methods=['POST'])
def create_event():
    body = request.get_json()
    if body is None:
        return jsonify({"msg": "El cuerpo de la petición debe ser JSON"}), 400

    required_fields = ['title', 'description', 'date', 'location', 'price', 'capacity', 'category', 'company_id']
    for field in required_fields:
        if field not in body:
            return jsonify({"msg": f"Falta el campo obligatorio: {field}"}), 400

    try:
        event_date = datetime.fromisoformat(body['date'].replace("Z", "+00:00"))
    except ValueError:
        return jsonify({"msg": "Formato de fecha inválido. Usa ISO 8601"}), 400

    company = db.session.get(Company, body['company_id'])
    if not company:
        return jsonify({"msg": "La empresa (company_id) especificada no existe"}), 404

    new_event = Event(
        title=body['title'],
        description=body['description'],
        date=event_date,
        location=body['location'],
        price=body['price'],
        capacity=body['capacity'],
        category=body['category'],
        image_url=body.get('image_url'),
        company_id=body['company_id']
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify({"msg": "Evento creado exitosamente", "event": new_event.serialize()}), 201

@api.route('/event', methods=['GET'])
def get_all_events():
    events = Event.query.all()
    return jsonify([event.serialize() for event in events]), 200

@api.route('/users', methods=['POST'])
def register_user():
    body = request.get_json()
    if body is None:
        return jsonify({"msg": "El cuerpo de la petición debe ser JSON"}), 400
    return jsonify({"msg": "Usuario registrado"}), 201

@api.route('/companies', methods=['POST'])
def register_company_dev():
    return jsonify({"msg": "Empresa registrada (endpoint developer)"}), 201

@api.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    data = request.get_json()
    event_id = data.get('event_id')

    event = Event.query.get(event_id)
    if not event:
        return jsonify({'error': 'Evento no encontrado'}), 404

    try:
        unit_amount = int(event.price * 100) 

        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'eur',
                    'unit_amount': unit_amount,
                    'product_data': {
                        'name': event.title,
                    },
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='https://tu-url-de-codespaces-3000.app.github.dev/success',
            cancel_url='https://tu-url-de-codespaces-3000.app.github.dev/',
        )
        return jsonify({'url': checkout_session.url}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@api.route('/confirm-purchase', methods=['POST'])
def confirm_purchase():
    data = request.get_json()
    
    user_id = data.get('user_id')
    event_id = data.get('event_id')
    
    if not user_id or not event_id:
        return jsonify({"msg": "Datos incompletos"}), 400

    new_buy = Buy(user_id=user_id, event_id=event_id)
    
    try:
        db.session.add(new_buy)
        db.session.commit()
        return jsonify({"msg": "Compra registrada con éxito"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error al guardar: {str(e)}"}), 500