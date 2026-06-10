from flask import Blueprint, request, jsonify
from api.models import db, Empresa 
from flask_bcrypt import Bcrypt 

api = Blueprint('api', __name__)
bcrypt = Bcrypt() 

@api.route('/registro-empresa', methods=['POST'])
def registrar_empresa():
    body = request.get_json()

    if not body:
        return jsonify({"msg": "Falta el cuerpo de la solicitud"}), 400
    
    password_hash = bcrypt.generate_password_hash(body['password']).decode('utf-8')
    
    nueva_empresa = Empresa(
        nombre_legal=body['nombre_legal'],
        cif_nif=body['cif_nif'],
        email=body['email'],
        password=password_hash,
        is_active=True 
    )

    try:
        db.session.add(nueva_empresa)
        db.session.commit()
        return jsonify({"msg": "Empresa registrada correctamente"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error al registrar: {str(e)}"}), 500
