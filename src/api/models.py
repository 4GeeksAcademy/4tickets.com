from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Float, Integer, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=True)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=True, default=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
        }

class Company(db.Model):
    __tablename__ = 'company'
    id: Mapped[int] = mapped_column(primary_key=True)
    nombre_legal: Mapped[str] = mapped_column(String(150), nullable=False)
    cif_nif: Mapped[str] = mapped_column(String(20), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=True)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=True, default=True)
    
    events = relationship('Event', backref='company', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "nombre_legal": self.nombre_legal,
            "cif_nif": self.cif_nif,
            "email": self.email,
            "name": self.name,
            "is_active": self.is_active
        }

class Event(db.Model):
    __tablename__ = 'event'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    date: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    location: Mapped[str] = mapped_column(String(250), nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    capacity: Mapped[int] = mapped_column(Integer, nullable=False)
    category: Mapped[str] = mapped_column(String(80), nullable=False)
    image_url: Mapped[str] = mapped_column(String(500), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), default=True)

    company_id: Mapped[int] = mapped_column(ForeignKey('company.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date.isoformat() if self.date else None,
            "location": self.location,
            "price": self.price,
            "capacity": self.capacity,
            "category": self.category,
            "image_url": self.image_url,
            "is_active": self.is_active,
            "company_id": self.company_id
        }
