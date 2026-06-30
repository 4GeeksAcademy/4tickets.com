import React from "react";
import { Link } from "react-router-dom";
import { FollowButton } from "./FollowButton.jsx"; 

export const EventCard = ({ event }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        {event.image_url && (
          <img
            src={event.image_url}
            className="card-img-top"
            alt={event.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}

        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{event.title}</h5>
          <p className="card-text text-muted mb-4">{event.description}</p>

          <div className="mb-3">
            <p className="card-text mb-1">
              <strong>Precio:</strong> {event.price} €
            </p>
            <p className="card-text mb-1">
              <strong>Aforo:</strong> {event.capacity} personas
            </p>
            {event.location && (
              <p className="card-text mb-1">
                <strong>Lugar:</strong> {event.location}
              </p>
            )}
            {event.date && (
              <p className="card-text mb-1">
                <strong>Fecha:</strong> {event.date}
              </p>
            )}
          </div>

          
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <FollowButton eventId={event.id} />
              
              
              <button 
                className="btn btn-success" 
                onClick={() => alert("Función de compra en desarrollo")}
              >
                🎟️ Comprar
              </button>
            </div>

            <Link to={`/single/${event.id}`} className="btn btn-outline-primary w-100">
              Ver Detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};