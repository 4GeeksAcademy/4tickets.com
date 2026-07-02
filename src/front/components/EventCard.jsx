import React from "react";
import { Link } from "react-router-dom";

export const EventCard = ({ event }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        {event.image_url && (
          <img
            src={event.image_url}
            className="card-img-top"
            alt={event.title}
          />
        )}

        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>

          <p className="card-text">{event.description}</p>

          <p className="card-text">
            <strong>Price:</strong> {event.price} EUR
          </p>

          <p className="card-text">
            <strong>Capacity:</strong> {event.capacity}
          </p>

          <Link to={`/single/${event.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

