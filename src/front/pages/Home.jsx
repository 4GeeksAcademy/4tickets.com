import React from "react";
import { Section } from "../components/Section";
import { SearchBar } from "../components/SearchBar.jsx";
import { AtroposCard } from "../components/Atropos.jsx";
import { User } from "../components/User";
import { EventList } from "../components/EventList";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      
	  <Link to="/create-event" className="btn btn-warning mt-3">
				Test Create Event
	  </Link>
     
	  <Section />

      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-lg-4 pt-2">
            <User />
          </div>

          <div className="col-lg-8">
            <AtroposCard />
          </div>
        </div>
      </div>

      <EventList />
    </>
  );
};



