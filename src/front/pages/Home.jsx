import React, { useEffect } from "react"
import { Section } from "../components/Section";
import { SearchBar } from "../components/SearchBar.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { AtroposCard } from "../components/Atropos.jsx"
import { User } from "../components/User";
import { Link } from "react-router-dom";
export const Home = () => {

	const { store } = useGlobalReducer();
	return (
		<>
        <Link to="/create-event" className="btn btn-warning mt-3">
            Test Create Event
        </Link>
		<Section />
		<div className="container my-5">
			<h1 className="mb-4">Eventos disponibles</h1>
			<div className="row">
				{store.events && store.events.length > 0 ? (
					store.events.map((event) => (
						<div className="col-md-4 mb-4" key={event.id}>
							<div className="card h-100">
								{event.image_url && (
									<img
										src={event.image_url}
										className="card-img-top"
										alt={event.title}
									/>
								)}
								<div className="card-body">
									<h5 className="card-title">{event.title}</h5>
									<p className="card-text">{event.description}</p>
									<p className="card-text">
										<strong>Precio:</strong> {event.price} EUR
									</p>
									<p className="card-text">
										<strong>Plazas:</strong> {event.capacity}
									</p>
									<Link to={`/single/${event.id}`} className="btn btn-primary">
										Ver detalle
									</Link>
								</div>
							</div>
						</div>
					))
				) : (
					<p>No hay eventos disponibles.</p>
				)}
			</div>
		</div>
	);
};
export default Home;