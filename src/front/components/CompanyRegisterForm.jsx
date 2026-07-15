import React, { useState } from "react";
import { BASE_BACK_URL } from "../core/constantsUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const CompanyRegisterForm = () => {
    
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        companyName: "",
        cif: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

       

        try {
            const response = await fetch(`${BASE_BACK_URL}api/registro-empresa`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre_legal: formData.companyName,
                cif_nif: formData.cif,
                email: formData.email,
                password: formData.password
            })
        });

        const data = await response.json();

        if (response.ok) {
            toast.success("Company created successfully!")
            navigate("/login");

            setFormData({
                companyName: "",
                cif: "",
                email: "",
                password: ""
            });

        } else {
            toast.error(data.msg ||"Registration failed. Please try again.");
        }

    } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.")
    }
};
    return (
    <div className="card border-0 shadow-lg p-4 rounded-4">
        <div className="text-center mb-4">
            <span className="text-primary fw-bold text-uppercase small">
                Join 4Tickets
            </span>

            <h2 className="mt-2 fw-bold">Create a Company Account</h2>

            <p className="text-muted mb-0">
                Publish your events, manage ticket sales and reach more customers.
            </p>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label fw-semibold">
                    Company Name
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="companyName"
                    placeholder="Enter your company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label fw-semibold">
                    Tax ID (CIF)
                </label>

                <input
                    type="text"
                    className="form-control"
                    name="cif"
                    placeholder="Enter your company tax ID"
                    value={formData.cif}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mb-3">
                <label className="form-label fw-semibold">
                    Business Email
                </label>

                <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="company@example.com"
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
                Create Company Account
            </button>
        </form>

        <p className="text-center text-muted mt-4 mb-0">
            Already have a company account?{" "}
            <a href="/login" className="text-decoration-none fw-semibold">
                Sign In
            </a>
        </p>
    </div>
);
};