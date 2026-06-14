from flask import Blueprint, request, jsonify
from api.models import db, Empresa
from flask_bcrypt import Bcrypt
from flask_cors import CORS

api = Blueprint('api', __name__)
bcrypt = Bcrypt()
CORS(api)

@api.route('/registro-empresa', methods=['POST'])
def registrar_empresa():
    data = request.get_json()
    
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"msg": "Faltan datos requeridos"}), 400

    if Empresa.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "El email ya está registrado"}), 400

    password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    nueva_empresa = Empresa(
        nombre_legal=data.get('nombre_legal'),
        cif_nif=data.get('cif_nif'),
        email=data['email'],
        password=password_hash,
        is_active=True
    )

    try:
        db.session.add(nueva_empresa)
        db.session.commit()
        return jsonify({"msg": "Empresa registrada con éxito"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Error en servidor", "error": str(e)}), 500
