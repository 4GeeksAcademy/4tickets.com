from flask import Blueprint, request, jsonify
from api.models import db, User, Event
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

api = Blueprint('api', __name__)


@api.route('/login', methods=['POST'])
def handle_login():
    body = request.get_json()
    if not body or "email" not in body or "password" not in body:
        return jsonify({"msg": "Faltan credenciales"}), 400

    if body["email"] == "test2@test.com":

        token = create_access_token(identity=str(1))
        return jsonify({"access_token": token, "msg": "Login exitoso"}), 200

    return jsonify({"msg": "Credenciales inválidas"}), 401


@api.route('/events/<int:event_id>/follow', methods=['POST', 'DELETE'])
@jwt_required()
def handle_event_follow(event_id):

    current_user_id = get_jwt_identity()

    user = db.session.get(User, int(current_user_id))
    event = db.session.get(Event, event_id)

    if not user or not event:
        return jsonify({"msg": "Usuario o evento no encontrado"}), 404

    if event in user.followed_events:
        user.followed_events.remove(event)
        db.session.commit()
        return jsonify({"msg": "Has dejado de seguir el evento", "action": "unfollowed"}), 200
    else:
        user.followed_events.append(event)
        db.session.commit()
        return jsonify({"msg": "Evento seguido correctamente", "action": "followed"}), 200
