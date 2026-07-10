from flask import request, jsonify, Blueprint
from api.models import db, User, Company, Event, Buy, UserEventFollow, ContactMessage
from flask_cors import CORS
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import stripe
import os
import uuid
import secrets
import traceback

api = Blueprint('api', __name__)
bcrypt = Bcrypt()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


@api.route('/users', methods=['POST'])
def register_user():
    body = request.get_json()
    if not body or "email" not in body or "password" not in body:
        return jsonify({"msg": "Data is missing"}), 400
    if User.query.filter_by(email=body['email']).first():
        return jsonify({"msg": "The user already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(
        body['password']).decode('utf-8')
    
    new_user = User(
        email=body['email'],
        name=body.get('name'), 
        password=hashed_password, 
        is_active=True
    )
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "Registered user", "user": new_user.serialize()}), 201


@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    if not body or "email" not in body or "password" not in body:
        return jsonify({"msg": "Faltan credenciales"}), 400

    user = User.query.filter_by(email=body.get("email")).first()
    if user and bcrypt.check_password_hash(user.password, body.get("password")):
        token = create_access_token(identity=str(user.id))
        return jsonify({"access_token": token, 
                        "accountType": "user",
                        "user": user.serialize()}), 200
    

    company = Company.query.filter_by(email=body.get("email")).first()

    if company and bcrypt.check_password_hash(company.password, body.get("password")):
        token = create_access_token(identity=str(company.id))

        return jsonify({
            "access_token": token,
            "accountType": "company",
            "company": company.serialize()
        }), 200

    return jsonify({"msg": "Invalid email or password"}), 401


@api.route('/registro-empresa', methods=['POST'])
def registrar_empresa():
    body = request.get_json()
    if not body:
        return jsonify({"msg": "The body is missing"}), 400
    if Company.query.filter_by(email=body.get('email')).first():
        return jsonify({"msg": "The email is already registered"}), 400

    hashed = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    new_company = Company(
        nombre_legal=body['nombre_legal'], cif_nif=body['cif_nif'], email=body['email'], password=hashed)
    db.session.add(new_company)
    db.session.commit()
    return jsonify({"msg": "Registered company", "company": new_company.serialize()}), 201


@api.route('/event', methods=['POST'])
def create_event():
    body = request.get_json()
    try:
        event_date = datetime.fromisoformat(
            body['date'].replace("Z", "+00:00"))
        new_event = Event(title=body['title'], description=body['description'], date=event_date,
                          location=body['location'], price=body['price'], capacity=body['capacity'],
                          category=body['category'], image_url=body['image_url'],
                          company_id=body['company_id'])
        db.session.add(new_event)
        db.session.commit()
        return jsonify({"msg": "Event created", "event": new_event.serialize()}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400


@api.route('/event', methods=['GET'])
def get_all_events():
    return jsonify([event.serialize() for event in Event.query.all()]), 200


@api.route('/event/<int:event_id>', methods=['GET'])
def get_single_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"msg": "Evento no encontrado"}), 404
    return jsonify(event.serialize()), 200


@api.route('/create-checkout-session', methods=['POST'])
@jwt_required()
def create_checkout_session():
    try:
        data = request.get_json()
        event_id = data.get("event_id")
        quantity = int(data.get("quantity", 1))

        if not event_id:
            return jsonify({'error': 'event_id is required'}), 400
        if quantity < 1:
            quantity = 1

        event = Event.query.get(event_id)         
        if not event:
            return jsonify({'error': 'Event not found'}), 404

        checkout_session = stripe.checkout.Session.create(
            line_items=[{
                'price_data': {
                    'currency': 'eur',
                    'unit_amount': int(round(event.price * 100)),  
                    'product_data': {'name': event.title},
                },
                'quantity': quantity,               
            }],
            mode='payment',
            metadata={                              
                'event_id': str(event.id),
                'quantity': str(quantity),
                'user_id': str(get_jwt_identity()),
            },
            success_url=os.getenv('FRONTEND_URL') + '/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=os.getenv('FRONTEND_URL') + '/single/' + str(event.id),
        )
        return jsonify({'url': checkout_session.url}), 200

    except Exception as e:
        print(f"ERROR DE STRIPE: {str(e)}")
        return jsonify({'error': str(e)}), 500


@api.route("/follow/event/<int:event_id>", methods=["POST"])
@jwt_required()
def follow_event(event_id):
    user_id = int(get_jwt_identity())
    if UserEventFollow.query.filter_by(user_id=user_id, event_id=event_id).first():
        return jsonify({"msg": "Ya sigues este evento"}), 400
    db.session.add(UserEventFollow(user_id=user_id, event_id=event_id))
    db.session.commit()
    return jsonify({"msg": "Event followed"}), 201


@api.route("/follow/event/<int:event_id>", methods=["DELETE"])
@jwt_required()
def unfollow_event(event_id):
    user_id = int(get_jwt_identity())
    follow = UserEventFollow.query.filter_by(
        user_id=user_id, event_id=event_id).first()
    if not follow:
        return jsonify({"msg": "You are not following this event"}), 404
    db.session.delete(follow)
    db.session.commit()
    return jsonify({"msg": "Event no longer followed"}), 200


@api.route("/users/followed-events", methods=["GET"])
@jwt_required()
def get_followed_events():
    user_id = int(get_jwt_identity())
    follows = UserEventFollow.query.filter_by(user_id=user_id).all()
    return jsonify([follow.event.serialize() for follow in follows]), 200


@api.route("/contact", methods=["POST"])
def create_contact_message():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    subject = data.get("subject")
    message = data.get("message")

    if not name or not email or not subject or not message:
        return jsonify({"msg": "All fields are required"}), 400

    new_message = ContactMessage(
        name=name,
        email=email,
        subject=subject,
        message=message
    )

    db.session.add(new_message)
    db.session.commit()

    return jsonify({
        "msg": "Message sent successfully",
        "contact": new_message.serialize()
    }), 201
