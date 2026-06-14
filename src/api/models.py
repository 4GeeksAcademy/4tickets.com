from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {"id": self.id, "email": self.email}

class Empresa(db.Model):
    __tablename__ = 'empresa'
    
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre_legal: Mapped[str] = mapped_column(String(120), nullable=False)
    cif_nif: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False) 
    is_active: Mapped[bool] = mapped_column(Boolean(), default=False)

    def __repr__(self):
        return f'<Empresa {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre_legal": self.nombre_legal,
            "cif_nif": self.cif_nif,
            "email": self.email
        }