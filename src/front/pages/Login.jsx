import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// 1. Importamos el hook
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {
    // 2. EXTRAEMOS EL DISPATCH AQUÍ (esto es lo que faltaba)
    const { dispatch } = useGlobalReducer();

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.msg);

            localStorage.setItem("token", data.access_token);
            dispatch({ type: "login_success", payload: { token: data.access_token } });
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-5">
                            <h2 className="text-center mb-4">Iniciar Sesión en 4tickets</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    className="form-control mb-3"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    className="form-control mb-4"
                                    placeholder="******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn btn-primary btn-lg w-100">
                                    Entrar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;