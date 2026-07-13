import React from "react"
import { Link } from "react-router-dom";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const User = () => {

    const { store } = useGlobalReducer();

    return (
        <div className="card shadow-sm">
            <div className="card-body">

                <h4 className="card-title mb-3">
                    One Platform for Everyone
                </h4>

                <p className="card-text">
                    Discover events, buy tickets, and create unforgettable experiences.
                </p>

                <ul className="list-group list-group-flush mb-4">
                    <li className="list-group-item">
                        🎟 Buy tickets in seconds            
                    </li>

                    <li className="list-group-item">
                        📅 Discover upcoming events
                    </li>

                    <li className="list-group-item">
                        🏢 Create and manage events
                    </li>

                    <li className="list-group-item">
                        🔒 Secure payments
                    </li>
                </ul>

                <Link
                    to="/register"
                    className="btn btn-primary w-100"
                >
                    Create Account
                </Link>

            </div>
        </div>
    );
};