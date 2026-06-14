from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from src.api.models import db, Empresa

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

@app.route('/register-empresa', methods=['POST'])
def register_empresa():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    
    new_empresa = Empresa(
        nombre=data['nombre'],
        email=data['email'],
        password=hashed_password
    )
    db.session.add(new_empresa)
    db.session.commit()
    return jsonify({"msg": "Empresa registrada"}), 201
