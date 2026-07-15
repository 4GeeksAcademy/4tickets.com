import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { EventCard } from "./EventCard.jsx";
import { BASE_BACK_URL } from "../core/constantsUrl";


export const EventList = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const url = `${BASE_BACK_URL}api/event`;

        const response = await fetch(url);

      
        if (!response.ok) {
          throw new Error("Error al obtener los eventos del servidor");
        }

        const data = await response.json();


        dispatch({
          type: "set_events",
          payload: data
        });
      } catch (error) {
        console.error("Error cargando los eventos:", error);
      }
    };

    fetchEvents();
  }, [dispatch]);


  return (
    <div className="container my-5">
      <h1 className="mb-4">Available Events</h1>

      <div className="row">
        {store.events && store.events.length > 0 ? (
          store.events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};