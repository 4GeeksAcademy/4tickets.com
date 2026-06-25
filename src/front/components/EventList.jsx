import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { EventCard } from "./EventCard";

export const EventList = () => {
  const { store } = useGlobalReducer();

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