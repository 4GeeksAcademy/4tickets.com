import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { FollowButton } from "../components/FollowButton.jsx";
import { BASE_BACK_URL } from "../core/constantsUrl.js";

export const Single = () => {
    const { store } = useGlobalReducer();
    const { theId } = useParams();

    const [quantity, setQuantity] = useState(1);

    const event = store.events.find((item) => item.id === parseInt(theId));

    const handlePayment = async () => {
    const token = localStorage.getItem("token"); 

    if (!token) {
        alert("You must log in to purchase tickets");
        return;
    }

    localStorage.setItem("last_event_id", event.id);
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create-checkout-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token 
            },
            body: JSON.stringify({
                event_id: event.id,
                quantity: quantity
            }),
        });

        const data = await response.json();
        
        if (response.ok && data.url) {
            window.location.href = data.url;
        } else {
            alert(data.msg || "Error starting payment");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Unable to connect to the payment server");
    }
};

    if (!event) {
        return (
            <div className="container text-center mt-5">
                <p>Event not found.</p>
                <Link to="/">
                    <span className="btn btn-primary">Return</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="card">
                {event.image_url && (
                    <img src={event.image_url} className="single-event-img card-img-top" alt={event.title} />
                )}
                <div className="card-body">
                    <h1>{event.title}</h1>
                    <p>{event.description}</p>
                    <p><strong>Date:</strong> {event.date}</p>
                    <p><strong>Place:</strong> {event.location}</p>
                    <p><strong>Price:</strong> {event.price} EUR</p>
                    <p><strong>Available places:</strong> {event.capacity}</p>

                <div className="mb-3">
                    <label className="form-label">Number of entries:</label>
                    <input 
                        type="number" 
                        className="form-control w-25" 
                        value={quantity} 
                        min="1" 
                        max={event.capacity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))} 
                    />
                </div>

                    <div className="d-flex gap-2 align-items-center">
                        <Link to="/" className="btn btn-secondary">
                            Back to events
                        </Link>
                        
                        {event.capacity > 0 ? (
                            <button onClick={handlePayment} className="btn btn-success">
                                Buy ticket
                            </button>
                        ) : (
                            <button className="btn btn-danger" disabled>
                                Unavailable
                            </button>
                        )}

                        {/* Aquí entra tu botón de seguir, integrado con los demás */}
                        <FollowButton eventId={event.id} />
                    </div>
                </div>
            </div>
        </div>
    );
};
