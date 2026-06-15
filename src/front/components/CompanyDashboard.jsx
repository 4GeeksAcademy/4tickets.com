import React from "react";
import { Link } from "react-router-dom";

export const CompanyDashboard = () => {
  return (
    <div className="container my-5">
      <h1>Company Dashboard</h1>

      <p>Manage your events and create new ones.</p>

      <Link to="/create-event" className="btn btn-primary mb-4">
        Create Event
      </Link>

      <h3>My Events</h3>
    </div>
  );
};

