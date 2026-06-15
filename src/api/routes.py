from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Company, Event
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_bcrypt import Bcrypt

api = Blueprint('api', __name__)
bcrypt = Bcrypt() 

CORS(api)

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
    # ... (resto de tu lógica de registro de usuario de developer)
    return jsonify({"msg": "Usuario registrado"}), 201

@api.route('/companies', methods=['POST'])
def register_company_dev():
    # Esta parece ser una ruta adicional de developer para empresas
    return jsonify({"msg": "Empresa registrada (endpoint developer)"}), 201