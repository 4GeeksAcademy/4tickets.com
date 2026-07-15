import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserRegisterForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            const backendUrl = import.meta.env.VITE_BACKEND_URL + "/api/users";

            const response = await fetch(backendUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("¡Datos enviados con éxito!", data);
                toast.success("User created successfully!")
                navigate("/login");


                setFormData({
                    name: "",
                    email: "",
                    password: ""
                });


            } else {

                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
                toast.error(data.msg || "Registration failed. Please try again.");
                
            }

        } catch (error) {

            console.error("Hubo un error de conexión:", error);
            toast.error("Something went wrong. Please try again.")
        }
    };

   
 return (
    <div className="card border-0 shadow-lg p-4 rounded-4">
        <div className="text-center mb-4">
            <span className="text-primary fw-bold text-uppercase small">
                Join 4Tickets
            </span>

            <h2 className="mt-2 fw-bold">Create your account</h2>

            <p className="text-muted mb-0">
                Discover events, buy tickets and never miss your favourite experiences.
            </p>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label fw-semibold">
                    Full Name
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label fw-semibold">
                    Email Address
                </label>

                <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-4">
                <label className="form-label fw-semibold">
                    Password
                </label>

                <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <small className="text-muted">
                    Use at least 6 characters.
                </small>
            </div>

            <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold"
            >
                Create Account
            </button>
        </form>

        <p className="text-center text-muted mt-4 mb-0">
            Already have an account?{" "}
            <a href="/login" className="text-decoration-none fw-semibold">
                Sign In
            </a>
        </p>
    </div>
);
};