import React, { useState } from "react";
import { BASE_BACK_URL } from "../core/constantsUrl";
import { toast } from "react-toastify";

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

  
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyId = localStorage.getItem("company_id");

    const newEvent = {
      title: eventName,
      description,
      date: `${date}T${time}`,
      location,
      price: Number(price),
      capacity: Number(tickets),
      category,
      image_url: imageUrl,
      company_id: Number(companyId)
    };

    try {

      console.log(newEvent);
                                
      const response = await fetch(`${BASE_BACK_URL}api/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        toast.success("Event created successfully");
      } else {
        toast.error(data.msg || "Failed to create event");
      }

    } catch (error) {
      console.log(error);
      toast.error("Server error. Please try again.");
    }
  };

  



  return (
    <div className="create-event-page">
      <div className="container">
        <div className="create-event-header">
          <h1>Create Event</h1>
          <p>Fill in the information to publish your event.</p>
        </div>

        <div className="create-event-box">
          <div className="row g-4">
            <div className="col-lg-7">
              <form onSubmit={handleSubmit}>
                <label className="event-label">Event name</label>
                <input
                  className="form-control event-input"
                  placeholder="Summer Festival"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />

                <label className="event-label">Description</label>
                <textarea
                  className="form-control event-input event-textarea"
                  placeholder="Write a short description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <div className="row">
                  <div className="col-md-6">
                    <label className="event-label">Date</label>
                    <input
                      className="form-control event-input"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="event-label">Time</label>
                    <input
                      className="form-control event-input"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>

                <label className="event-label">Location</label>
                <input
                  className="form-control event-input"
                  placeholder="Córdoba, Spain"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />

                <div className="row">
                  <div className="col-md-6">
                    <label className="event-label">Price</label>
                    <input
                      className="form-control event-input"
                      type="number"
                      placeholder="25"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="event-label">Available tickets</label>
                    <input
                      className="form-control event-input"
                      type="number"
                      placeholder="300"
                      value={tickets}
                      onChange={(e) => setTickets(e.target.value)}
                    />
                  </div>
                </div>

                <label className="event-label">Event image URL</label>
                <input
                  className="form-control event-input"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />

                <label className="event-label">Category</label>
                <select
                  className="form-select event-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="Concert">Concert</option>
                  <option value="Festival">Festival</option>
                  <option value="Sports">Sports</option>
                  <option value="Theater">Theater</option>
                  <option value="Other">Other</option>
                </select>

                <button type="submit" className="create-event-btn">
                  Create Event
                </button>
              </form>
            </div>

            <div className="col-lg-5">
              <div className="event-preview">
                <div className="preview-image-box">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Event preview" />
                  ) : (
                    <div className="preview-placeholder">
                      Event image preview
                    </div>
                  )}
                </div>

                <div className="preview-content">
                  <span className="preview-category">
                    {category || "Category"}
                  </span>

                  <h3>{eventName || "Event name"}</h3>

                  <p className="preview-description">
                    {description || "Your event description will appear here."}
                  </p>

                  <div className="preview-info">
                    <p>📅 {date || "Date"} {time || "Time"}</p>
                    <p>📍 {location || "Location"}</p>
                    <p>🎟️ {tickets || "0"} tickets available</p>
                  </div>

                  <div className="preview-price">
                    {price ? `${price} €` : "Free / Price"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
};