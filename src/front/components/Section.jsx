import React from "react"
import Malaga from "../assets/img/Malaga.avif";


export const Section = () => {
    return (
        <div className="container text-center my-5">

            <h1 className="display-3 fw-bold">Buy and Sell Tickets Easily</h1>

            <h4 className="mt-3">
                Find events, buy tickets, or create your own events.
            </h4>

           <img
                src={Malaga}
                alt="Events"
                className="img-fluid rounded-4 shadow"
            />

        </div>
    );
};