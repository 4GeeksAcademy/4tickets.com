import React, { useState } from "react";
import { BASE_BACK_URL } from "../core/constantsUrl";

export const Contact = () => {

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");

        try {
            const response = await fetch(`${BASE_BACK_URL}api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.msg);
                setSuccess(true);

                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
            } else {
                setMessage(data.msg || "Something went wrong");
                setSuccess(false);
            }

        } catch (error) {
            console.log(error);
            setMessage("Server error");
            setSuccess(false);
        }
    };

    return (
        <div className="container py-5">

            <div className="text-center mb-5">
                <h1>Contact Us</h1>
                <p className="text-muted">
                    We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.
                </p>
            </div>

            <div className="row g-5">

                <div className="col-lg-5">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body p-4">

                            <h3 className="mb-4">Contact Information</h3>

                            <p>
                                <strong>Email</strong><br />
                                support@4tickets.com
                            </p>

                            <p>
                                <strong>Phone</strong><br />
                                +34 600 123 456
                            </p>

                            <p>
                                <strong>Address</strong><br />
                                Córdoba, Spain
                            </p>

                            <hr />

                            <p className="text-muted">
                                Our support team is available Monday to Friday from 9:00 AM to 6:00 PM.
                            </p>

                        </div>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Subject</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        className="form-control"
                                        rows="6"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button className="btn btn-warning w-100" type="submit">
                                    Send Message
                                </button>

                                {message && (
                                    <div className={`alert ${success ? "alert-success" : "alert-danger"} mt-3`}>
                                        {message}
                                    </div>
                                )}

                            </form>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};