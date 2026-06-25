import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <h3>4Tickets</h3>
                </Link>
                <div className="ms-auto">
                    <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                    <Link className="btn btn-outline-primary" to="/contact">Contact</Link>
                </div>
            </div>
        </nav>
    );
};