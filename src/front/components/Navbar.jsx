import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBuilding, FaPowerOff, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

import { BASE_BACK_URL } from "../core/constantsUrl";

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [accountData, setAccountData] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("company_id");
        localStorage.removeItem("company_name");

        setAccountData(null);

        toast.success("Logged out successfully!");

        navigate("/");
    };

    useEffect(() => {
        const getProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setAccountData(null);
                setLoadingProfile(false);
                return;
            }

            try {
                setLoadingProfile(true);

                const cleanToken = token.replace(/['"]+/g, "");

                const response = await fetch(
                    `${BASE_BACK_URL}api/profile`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${cleanToken}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setAccountData(data);
                } else {
                    console.error(
                        data.msg || "Error loading profile"
                    );

                    localStorage.removeItem("token");
                    setAccountData(null);
                }
            } catch (error) {
                console.error("Error loading profile:", error);
                setAccountData(null);
            } finally {
                setLoadingProfile(false);
            }
        };

        getProfile();
    }, [location.pathname]);

    const isCompany =
        accountData?.accountType === "company";

    const accountName = isCompany
        ? accountData?.company?.nombre_legal ||
          accountData?.nombre_legal ||
          accountData?.company?.email ||
          accountData?.email ||
          "Company Account"
        : accountData?.user?.name ||
          accountData?.user?.username ||
          accountData?.name ||
          accountData?.username ||
          accountData?.user?.email ||
          accountData?.email ||
          "My Account";

    const avatar =
        accountData?.user?.avatar ||
        accountData?.avatar;

    const dashboardPath = isCompany
        ? "/company-dashboard"
        : "/user-dashboard";

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <h3 className="mb-0">4Tickets</h3>
                </Link>

                <div className="ms-auto d-flex align-items-center">
                    {!loadingProfile && accountData ? (
                        <div className="dropdown me-2">
                            <button
                                className="btn btn-outline-primary dropdown-toggle d-flex align-items-center"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <div
                                    className="d-flex justify-content-center align-items-center overflow-hidden me-2"
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        borderRadius: "50%"
                                    }}
                                >
                                    {avatar ? (
                                        <img
                                            src={avatar}
                                            alt="Account avatar"
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    ) : isCompany ? (
                                        <FaBuilding />
                                    ) : (
                                        <FaUser />
                                    )}
                                </div>

                                <span>{accountName}</span>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to={dashboardPath}
                                    >
                                        Dashboard
                                    </Link>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <button
                                        className="dropdown-item d-flex align-items-center text-danger"
                                        type="button"
                                        onClick={handleLogout}
                                    >
                                        <FaPowerOff className="me-2" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : !loadingProfile ? (
                        <Link
                            className="btn btn-outline-primary me-2"
                            to="/login"
                        >
                            Login
                        </Link>
                    ) : null}

                    <Link
                        className="btn btn-outline-primary"
                        to="/contact"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};