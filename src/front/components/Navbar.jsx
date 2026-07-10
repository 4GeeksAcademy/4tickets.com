import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { toast } from "react-toastify";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");

        dispatch({
            type: "logout"
        });
        toast.info("You have been logged out.");

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
          ) :  store.accountType === "user" ? (
                    <div className="dropdown me-2">
                        <button
                            className="btn btn-outline-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {store.user?.name || store.user?.email}
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/user-dashboard"
                                >
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
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPowerOff, FaUser } from 'react-icons/fa';
import { BASE_BACK_URL } from "../core/constantsUrl";

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserData(null);
        navigate("/");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const cleanToken = token.replace(/['"]+/g, '');
            fetch(`${BASE_BACK_URL}/api/user/profile`, {
                method: "GET",
                headers: { 
                    "Authorization": `Bearer ${cleanToken}`,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => setUserData(data))
            .catch(err => console.error("Error cargando perfil:", err));
        } else {
            setUserData(null);
        }
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/"><h3>4Tickets</h3></Link>
                <div className="ms-auto d-flex align-items-center">
                    {userData ? (
                        <div className="d-flex align-items-center">
                            
                            <Link to="/user-dashboard" className="text-decoration-none d-flex align-items-center me-3">
                                <div className="d-flex justify-content-center align-items-center me-2 overflow-hidden" 
                                     style={{ width: "40px", height: "40px", borderRadius: "50%" }}>
                                    {userData?.avatar
                                        ? <img src={userData.avatar} alt="avatar" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                        : <FaUser className="text-secondary" style={{ fontSize: "24px" }} />}
                                </div>
                                <span className="text-dark fw-bold">My Account</span>
                            </Link>

                            <button onClick={handleLogout} className="btn btn-light d-flex align-items-center border border-danger">
                                <span className="text-danger me-2 fw-bold">Logout</span>
                                <FaPowerOff className="text-danger" />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link className="btn btn-outline-primary me-2" to="/register">Register</Link>
                            <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                            <Link className="btn btn-outline-primary" to="/contact">Contact</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};