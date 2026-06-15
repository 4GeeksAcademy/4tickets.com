import React, { useState } from "react";

export const CreateEvent = () => {

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [tickets, setTickets] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="container my-5">
      <h1>Create Event</h1>
      <p>Fill in the information to publish your event.</p>

      <form>

        <input
          className="form-control mb-3"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <input
          className="form-control mb-3"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="number"
          placeholder="Available Tickets"
          value={tickets}
          onChange={(e) => setTickets(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Event Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
/>

        <button className="btn btn-primary">
          Create Event
        </button>

      </form>
    </div>
  );
};

