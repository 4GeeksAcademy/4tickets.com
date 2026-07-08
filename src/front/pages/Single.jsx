import React from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { FollowButton } from "../components/FollowButton.jsx";
import { BASE_BACK_URL } from "../core/constantsUrl.js";

export const Single = () => {
    const { store } = useGlobalReducer();
    const { theId } = useParams();

    const event = store.events.find((item) => item.id === parseInt(theId));

    const handlePayment = async () => {
        localStorage.setItem("last_event_id", event.id);
        try {
            const response = await fetch(`${BASE_BACK_URL}api/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    event_id: event.id,
                    user_id: 1 
                }),
            });

            const data = await response.json();
            
            if (response.ok && data.url) {
                window.location.href = data.url;
            } else {
                alert(data.msg || "Error al iniciar el pago");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor de pagos");
        }
    };

    if (!event) {
        return (
            <div className="container text-center mt-5">
                <p>Evento no encontrado.</p>
                <Link to="/">
                    <span className="btn btn-primary">Volver</span>
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
                    <p><strong>Fecha:</strong> {event.date}</p>
                    <p><strong>Lugar:</strong> {event.location}</p>
                    <p><strong>Precio:</strong> {event.price} EUR</p>
                    <p><strong>Plazas disponibles:</strong> {event.capacity}</p>

                    <div className="d-flex gap-2 align-items-center">
                        <Link to="/" className="btn btn-secondary">
                            Volver a eventos
                        </Link>
                        
                        {event.capacity > 0 ? (
                            <button onClick={handlePayment} className="btn btn-success">
                                Comprar entrada
                            </button>
                        ) : (
                            <button className="btn btn-danger" disabled>
                                Agotado
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
