import React from "react";
import { Link } from "react-router-dom";

export const EventCard = ({ event }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
  <div className="card event-card h-100">
    {event.image_url && (
      <img
        src={event.image_url}
        className="card-img-top event-card-img"
        alt={event.title}
      />
    )}

    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{event.title}</h5>

      <p className="event-description">{event.description}</p>

      <div className="event-info mt-auto">
        <p>
          <strong>📍 Location:</strong> {event.location}
        </p>

        <p>
          <strong>📅 Date:</strong>{" "}
          {new Date(event.date).toLocaleDateString("en-GB")}
        </p>

        <p className="event-price">
          {event.price} €
        </p>
      </div>

      <Link
        to={`/single/${event.id}`}
        className="btn btn-primary w-100 mt-2"
      >
        View Details
      </Link>
    </div>
  </div>
</div>
  )
};

