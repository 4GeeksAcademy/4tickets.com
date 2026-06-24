import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.access_token);
            navigate("/");
        } else {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleLogin} className="col-md-6 mx-auto">
                <h2>Iniciar Sesión</h2>
                <input type="email" placeholder="Email" className="form-control mb-2" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="form-control mb-2" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="btn btn-primary">Entrar</button>
            </form>
        </div>
    );
};