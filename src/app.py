import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.url_map.strict_slashes = False

# CORS GLOBAL: vital para evitar el error de bloqueo del navegador
CORS(app)

# Configuración DB
db_url = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
    "postgres://", "postgresql://") if db_url else "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
MIGRATE = Migrate(app, db, compare_type=True)
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = "super-secreta-4tickets"

setup_admin(app)
setup_commands(app)
app.register_blueprint(api, url_prefix='/api')


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
