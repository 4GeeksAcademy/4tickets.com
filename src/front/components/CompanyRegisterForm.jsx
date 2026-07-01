import React, { useState } from "react";
import { BASE_BACK_URL } from "../core/constantsUrl";
import { useNavigate } from "react-router-dom";


export const CompanyRegisterForm = () => {
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
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

        setMessage("");

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
            setMessage("Company registered successfully");
            setSuccess(true);
            navigate("/login");

            setFormData({
                companyName: "",
                cif: "",
                email: "",
                password: ""
            });

        } else {
            setMessage(data.msg || "Error registering company");
            setSuccess(false);
        }

    } catch (error) {
        console.error(error);
        setMessage("Server error");
        setSuccess(false);
    }
};
    return (
        <div className="card p-4 shadow-sm border-primary">
            <h3 className="text-center mb-3">Crear cuenta de Empresa</h3>
            {message && (
                <div className={`alert ${success ? "alert-success" : "alert-danger"}`}>
                {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Razón Social (Nombre de la empresa)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">CIF</label>
                    <input
                        type="text"
                        className="form-control"
                        name="cif"
                        value={formData.cif}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo electrónico de contacto</label>
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
                    <label className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">
                    Registrar Empresa
                </button>
            </form>
        </div>
    );
};