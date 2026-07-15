from flask import request, jsonify, Blueprint
from api.models import db, User, Company, Event, Buy, UserEventFollow, ContactMessage
from flask_cors import CORS
from datetime import datetime
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
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

    if user and bcrypt.check_password_hash(
        user.password,
        body.get("password")
    ):
        token = create_access_token(
            identity=str(user.id),
            additional_claims={
                "accountType": "user"
            }
        )

        return jsonify({
            "access_token": token,
            "accountType": "user",
            "user": user.serialize()
        }), 200

    company = Company.query.filter_by(email=body.get("email")).first()

    if company and bcrypt.check_password_hash(
        company.password,
        body.get("password")
    ):
        token = create_access_token(
            identity=str(company.id),
            additional_claims={
                "accountType": "company"
            }
        )

        return jsonify({
            "access_token": token,
            "accountType": "company",
            "company": company.serialize()
        }), 200

    return jsonify({
        "msg": "Invalid email or password"
    }), 401


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
@jwt_required()
def create_event():
    body = request.get_json()
    company_id = int(get_jwt_identity())

    try:
        event_date = datetime.fromisoformat(
            body['date'].replace("Z", "+00:00")
        )

        new_event = Event(
            title=body['title'],
            description=body['description'],
            date=event_date,
            location=body['location'],
            price=body['price'],
            capacity=body['capacity'],
            category=body['category'],
            image_url=body['image_url'],
            company_id=company_id
        )

        db.session.add(new_event)
        db.session.commit()

        return jsonify({
            "msg": "Event created",
            "event": new_event.serialize()
        }), 201

    except Exception as e:
        db.session.rollback()
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

@api.route('/event/<int:event_id>', methods=['PUT'])
@jwt_required()
def update_event(event_id):
    claims = get_jwt()

    if claims.get("accountType") != "company":
        return jsonify({
            "msg": "Only companies can edit events"
        }), 403

    company_id = int(get_jwt_identity())

    event = Event.query.get(event_id)

    if not event:
        return jsonify({
            "msg": "Event not found"
        }), 404

    if event.company_id != company_id:
        return jsonify({
            "msg": "You cannot edit another company's event"
        }), 403

    body = request.get_json()

    try:
        if "title" in body:
            event.title = body["title"]

        if "description" in body:
            event.description = body["description"]

        if "date" in body:
            event.date = datetime.fromisoformat(
                body["date"].replace("Z", "+00:00")
            )

        if "location" in body:
            event.location = body["location"]

        if "price" in body:
            event.price = body["price"]

        if "capacity" in body:
            event.capacity = body["capacity"]

        if "category" in body:
            event.category = body["category"]

        if "image_url" in body:
            event.image_url = body["image_url"]

        db.session.commit()

        return jsonify({
            "msg": "Event updated",
            "event": event.serialize()
        }), 200

    except Exception as e:
        db.session.rollback()

        return jsonify({
            "msg": str(e)
        }), 400
    
@api.route('/event/<int:event_id>', methods=['DELETE'])
@jwt_required()
def delete_event(event_id):
    claims = get_jwt()

    if claims.get("accountType") != "company":
        return jsonify({
            "msg": "Only companies can delete events"
        }), 403

    company_id = int(get_jwt_identity())

    event = Event.query.get(event_id)

    if not event:
        return jsonify({
            "msg": "Event not found"
        }), 404

    if event.company_id != company_id:
        return jsonify({
            "msg": "You cannot delete another company's event"
        }), 403

    db.session.delete(event)
    db.session.commit()

    return jsonify({
        "msg": "Event deleted successfully"
    }), 200    

@api.route('/create-checkout-session', methods=['POST'])
@jwt_required()
def create_checkout_session():
    claims = get_jwt()

    if claims.get("accountType") != "user":
        return jsonify({
            "msg": "Only users can purchase tickets"
        }), 403

    
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
            success_url=os.getenv('FRONTEND_URL') + 'success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=os.getenv('FRONTEND_URL') + 'single/' + str(event.id),
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


def generate_unique_ticket_code():
    while True:
        code = secrets.token_hex(8).upper()
        if not Buy.query.filter_by(ticket_code=code).first():
            return code


@api.route('/confirm-purchase', methods=['POST'])
@jwt_required()
def confirm_purchase():
    try:
        user_id = get_jwt_identity()
        body = request.get_json() or {}
        session_id = body.get("session_id")
        if not session_id:
            return jsonify({"message": "No session id provided"}), 400

        session = stripe.checkout.Session.retrieve(session_id)

        if session["payment_status"] != "paid":
            return jsonify({"message": "Payment not completed"}), 400

        existing = Buy.query.filter_by(stripe_session_id=session_id).all()
        if existing:
            event = Event.query.get(existing[0].event_id)
            return jsonify({
                "event": event.serialize() if event else None,
                "tickets": [b.serialize() for b in existing]
            }), 200

        meta = session["metadata"]
        if not meta or "event_id" not in meta:
            return jsonify({"message": "event_id missing in metadata"}), 400

        event_id = int(meta["event_id"])
        quantity = int(meta["quantity"]) if "quantity" in meta else 1

        event = Event.query.get(event_id)
        if not event:
            return jsonify({"message": "Event not found"}), 404

        if event.capacity < quantity:
            return jsonify({"message": "No hay suficientes plazas disponibles"}), 400

        tickets = []
        for _ in range(quantity):
            buy = Buy(
                user_id=int(user_id),
                event_id=event_id,
                ticket_code=generate_unique_ticket_code(),
                stripe_session_id=session_id
            )
            db.session.add(buy)
            tickets.append(buy)

        event.capacity -= quantity

        db.session.commit()

        return jsonify({
            "event": event.serialize(),
            "tickets": [b.serialize() for b in tickets]
        }), 200

    except Exception as e:
        db.session.rollback()
        traceback.print_exc()
        print(f"ERROR CONFIRM: {type(e).__name__}: {str(e)}")
        return jsonify({"message": f"{type(e).__name__}: {str(e)}"}), 500


@api.route('/user/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404
    return jsonify(user.serialize()), 200


@api.route('/user/profile', methods=['PUT'])
@jwt_required()
def update_user_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    body = request.get_json()

    if 'email' in body and body['email'] != user.email:
        if User.query.filter_by(email=body['email']).first():
            return jsonify({"msg": "This email address is already in use"}), 400
        user.email = body['email']

    if 'address' in body: user.address = body['address']
    if 'phone' in body: user.phone = body['phone']
    if 'avatar' in body: user.avatar = body['avatar']

    db.session.commit()
    return jsonify({"msg": "Updated profile", "user": user.serialize()}), 200


@api.route('/check-username/<username>', methods=['GET'])
def check_username(username):
    user = User.query.filter_by(username=username).first()
    return jsonify({"exists": user is not None}), 200


@api.route('/user/tickets', methods=['GET'])
@jwt_required()
def get_user_tickets():
    user_id = int(get_jwt_identity())
    user_buys = Buy.query.filter_by(user_id=user_id).order_by(Buy.purchase_date.desc()).all()

    tickets_list = []
    for buy in user_buys:
        tickets_list.append({
            "id": buy.id,
            "event_id": buy.event.id,
            "event_title": buy.event.title,
            "description": buy.event.description,
            "date": buy.event.date.strftime("%d/%m/%Y %H:%M"),
            "location": buy.event.location,
            "price": buy.event.price,
            "category": buy.event.category,
            "image_url": buy.event.image_url,
            "qr_code_data": buy.ticket_code,
            "purchase_date": buy.purchase_date.isoformat()
        })

    return jsonify(tickets_list), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    account_id = int(get_jwt_identity())
    claims = get_jwt()
    account_type = claims.get("accountType")

    if account_type == "user":
        user = User.query.get(account_id)

        if not user:
            return jsonify({"msg": "User not found"}), 404

        return jsonify({
            "accountType": "user",
            "user": user.serialize()
        }), 200

    if account_type == "company":
        company = Company.query.get(account_id)

        if not company:
            return jsonify({"msg": "Company not found"}), 404

        return jsonify({
            "accountType": "company",
            "company": company.serialize()
        }), 200

    return jsonify({"msg": "Invalid account type"}), 400

@api.route('/company/events', methods=['GET'])
@jwt_required()
def get_company_events():
    company_id = int(get_jwt_identity())

    events = Event.query.filter_by(company_id=company_id).all()

    return jsonify([event.serialize() for event in events]), 200
