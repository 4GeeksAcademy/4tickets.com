import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_BACK_URL } from "../core/constantsUrl";

export const CompanyDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getCompanyEvents = async () => {
      try {
        const response = await fetch(
          `${BASE_BACK_URL}api/company/events`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        const data = await response.json();

        if (response.ok) {
          setEvents(data);
        } else {
          console.log(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCompanyEvents();
  }, []);

  return (
    <div className="container my-5">
      <h1>Company Dashboard</h1>

      <p>Manage your events and create new ones.</p>

      <Link to="/create-event" className="btn btn-primary mb-4">
        Create Event
      </Link>

      <h3 className="mb-4">My Events</h3>

      {events.length === 0 ? (
        <p>You haven't created any events yet.</p>
      ) : (
        <div className="row">
          {events.map((event) => (
            <div className="col-md-4 mb-4" key={event.id}>
              <div className="card h-100">
                {event.image_url && (
                  <img
                    src={event.image_url}
                    className="card-img-top"
                    alt={event.title}
                    style={{
                      height: "220px",
                      objectFit: "cover"
                    }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.title}</h5>

                  <p className="card-text">
                    {event.description}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {event.location}
                  </p>

                  <p>
                    <strong>Price:</strong>{" "}
                    {event.price} €
                  </p>

                  <p>
                    <strong>Capacity:</strong>{" "}
                    {event.capacity}
                  </p>
                  <div className="mt-auto d-flex justify-content-center gap-3">
                  <Link
                    to={`/single/${event.id}`}
                    className="btn btn-outline-primary mt-auto"
                  >
                    View Details
                  </Link>
                  <Link
                    to={`/edit-event/${event.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEvent(event.id)}
                  >
                    Delete
                  </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};