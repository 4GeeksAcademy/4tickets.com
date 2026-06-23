import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light position-fixed w-100">
            <div className="container">


                <Link className="navbar-brand" to="/">
                    4Tickets
                </Link>

                <div className="ms-auto">

                    <Link className="btn btn-outline-primary me-2" to="/login">
                        Login
                    </Link>


                    <a className="btn btn-outline-primary" href="#">
                        Contact
                    </a>
                </div>

            </div>
        </nav>
    );
};