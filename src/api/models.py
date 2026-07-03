from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Float, Integer, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime, timezone

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=True)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean(), nullable=True, default=True)

    followed_events = db.relationship("UserEventFollow", back_populates="user")

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
    cif_nif: Mapped[str] = mapped_column(
        String(20), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(
        String(120), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=True)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean(), nullable=True, default=True)

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
    followers = db.relationship("UserEventFollow", back_populates="event")

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


class Buy(db.Model):
    __tablename__ = 'buy'
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=False)
    event_id: Mapped[int] = mapped_column(
        ForeignKey('event.id'), nullable=False)
    purchase_date: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
        )

    user = relationship('User', backref='buys')
    event = relationship('Event', backref='buys')
    
class UserEventFollow(db.Model):
    __tablename__ = "user_event_follow"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("event.id"), nullable=False)
    user = db.relationship("User", back_populates="followed_events")
    event = db.relationship("Event", back_populates="followers")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
            "purchase_date": self.purchase_date.isoformat()
        }

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    message = db.Column(db.Text, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "subject": self.subject,
            "message": self.message
        }