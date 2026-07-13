import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_BACK_URL } from "../core/constantsUrl";
import { toast } from "react-toastify";

export const EditEvent = () => {
    const { theId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        price: "",
        capacity: "",
        category: "",
        image_url: ""
    });

    useEffect(() => {
        const getEvent = async () => {
            try {
                const response = await fetch(
                    `${BASE_BACK_URL}api/event/${theId}`
                );

                const data = await response.json();

                if (response.ok) {
                    setFormData({
                        title: data.title,
                        description: data.description,
                        date: data.date.slice(0, 16),
                        location: data.location,
                        price: data.price,
                        capacity: data.capacity,
                        category: data.category,
                        image_url: data.image_url
                    });
                } else {
                    toast.error(data.msg);
                }
            } catch (error) {
                console.error(error);
                toast.error("Error loading event.");
            }
        };

        getEvent();
    }, [theId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${BASE_BACK_URL}api/event/${theId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {
                toast.success("Event updated successfully.");
                navigate("/company-dashboard");
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="container my-5">
            <h1>Edit Event</h1>

            <form onSubmit={handleSubmit}>

                <input
                    className="form-control mb-3"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                />

                <textarea
                    className="form-control mb-3"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />

                <input
                    type="datetime-local"
                    className="form-control mb-3"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                />

                <input
                    type="number"
                    className="form-control mb-3"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="Capacity"
                />

                <input
                    className="form-control mb-3"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                />

                <input
                    className="form-control mb-4"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="Image URL"
                />

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Save Changes
                </button>

            </form>
        </div>
    );
};