import React from "react";
import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Single = () => {
  const { store, dispatch } = useGlobalReducer();
  const { theId } = useParams();
  const eventId = parseInt(theId);
  const isFollowing = store.followedEvents?.includes(eventId);

  const handleFollowClick = async () => {
    const wasFollowing = isFollowing;
    const tokenSeguro = (store.token || localStorage.getItem("token") || "").replace(/['"]+/g, '');

    if (!tokenSeguro) {
      alert("No hay token disponible. Por favor, inicia sesión.");
      return;
    }

    try {
      const method = isFollowing ? 'DELETE' : 'POST';
      dispatch({ type: isFollowing ? "unfollow_event" : "follow_event", payload: eventId });

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}/follow`, {
        method: method,
        headers: {
          "Authorization": `Bearer ${tokenSeguro}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.msg || "Error en el servidor");
      }
    } catch (error) {
      dispatch({ type: wasFollowing ? "follow_event" : "unfollow_event", payload: eventId });
      console.error("Error detectado:", error);
      alert(error.message);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Detalles del Evento #{eventId}</h1>
      <hr className="my-4" />
      <div className="d-flex justify-content-center gap-3">
        <button
          onClick={handleFollowClick}
          className={`btn btn-lg ${isFollowing ? 'btn-success' : 'btn-outline-primary'}`}
        >
          {isFollowing ? <><i className="fa-solid fa-check"></i> Siguiendo</> : <><i className="fa-regular fa-star"></i> Seguir Evento</>}
        </button>
        <Link to="/"><span className="btn btn-secondary btn-lg">Volver al inicio</span></Link>
      </div>
    </div>
  );
};

export default Single;