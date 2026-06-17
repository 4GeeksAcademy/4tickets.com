import React, { useEffect } from "react"
import { Section } from "../components/Section";
import { SearchBar } from "../components/SearchBar.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { AtroposCard } from "../components/Atropos.jsx"
import { User } from "../components/User";
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

                    <div className="col-md-4">
                        <User />
                    </div>

                    <div className="col-md-8">
                        <AtroposCard />
                    </div>

                </div>
            </div>
		
		</>
	)
};

export default Home;