import React, { useState } from "react";
import { BASE_BACK_URL } from "../core/constantsUrl";

export const CreateEvent = () => {

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [tickets, setTickets] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  
  //PRUEBA TEST
  const BASE_TEST_URL = "https://fantastic-space-adventure-x5pv46g76x4xfp6p7-3001.app.github.dev/"
  //
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title: eventName,
      description,
      date: `${date}T${time}`,
      location,
      price: Number(price),
      capacity: Number(tickets),
      category,
      image_url: imageUrl,
      company_id: 1
    };

    try {

      console.log(newEvent);
                                // PRUEBA TEST URL BACK 
      const response = await fetch(`${BASE_TEST_URL}api/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        alert("Event created successfully");
      } else {
        alert("Error creating event");
      }

    } catch (error) {
      console.log(error);
    }
  };

  



  return (
    <div className="container my-5">
      <h1>Create Event</h1>
      <p>Fill in the information to publish your event.</p>

      <form onSubmit={handleSubmit}>

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

        <input
          className="form-control mb-3"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />  


        <button  type="submit" className="btn btn-primary">
          Create Event
        </button>

      </form>
    </div>
  );
};

