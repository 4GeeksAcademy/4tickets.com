import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");

        dispatch({
            type: "logout"
        });

        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <h3>4Tickets</h3>
                </Link>

            <div className="ms-auto d-flex">
                    {store.accountType === "company" ? (
                        <div className="dropdown me-2">
                            <button
                                className="btn btn-outline-primary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {store.company?.nombre_legal}
                            </button>
                <ul className="dropdown-menu dropdown-menu-end">
                     <li>
                         <Link className="dropdown-item" to="/company-dashboard">
                         Dashboard
                         </Link>
                     </li>

                     <li>
                         <button
                         className="dropdown-item"
                         onClick={handleLogout}
                         >
                        Logout
                        </button>
                    </li>
                </ul>
            </div>  
          ) : (           

                
                    <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                )}
                    <Link className="btn btn-outline-primary" to="/contact">Contact</Link>
                </div>
            </div>
        </nav>
    );
};