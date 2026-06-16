import React from "react";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const User = () => {

    const { store } = useGlobalReducer();

    return (
        <div>

            <div className="card mb-3 border-danger">
                <div className="card-header bg-danger text-white">
                    <h5 className="card-title mb-0">❤️ Mis Favoritos</h5>
                </div>
                <div className="card-body">

                    {store.followedEvents && store.followedEvents.length > 0 ? (
                        <ul className="list-group list-group-flush">
                            {store.followedEvents.map((eventId) => (
                                <li key={eventId} className="list-group-item d-flex justify-content-between align-items-center px-0">
                                    Evento #{eventId}
                                    <span className="badge bg-danger rounded-pill">Siguiendo</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="card-text text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                            Aún no sigues ningún evento. ¡Explora el catálogo y añade tus favoritos!
                        </p>
                    )}
                </div>
            </div>


            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">Buy Tickets</h5>
                    <p className="card-text">
                        Find events and buy your tickets quickly and safely.
                    </p>
                    <button className="btn btn-primary">
                        Find Events
                    </button>
                </div>
            </div>

            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Register Company</h5>
                    <p className="card-text">
                        Create events and sell tickets online with 4Tickets.
                    </p>
                    <button className="btn btn-primary">
                        Start Selling
                    </button>
                </div>
            </div>
        </div>
    );
};