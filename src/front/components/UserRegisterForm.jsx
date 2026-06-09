import React, { useState, useContext } from "react";
// Dependiendo de cómo se llame el archivo de Contexto en esta nueva plantilla, 
// la importación será algo parecido a esto. A veces está en Layout.jsx o un AppContext.jsx
// import { Context } from "../Layout"; 

export const UserRegisterForm = () => {
    // Descomenta y ajusta la importación del Contexto cuando confirmes el nombre
    // const { store, dispatch } = useContext(Context); 
    
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
            console.log("Iniciando simulación de fetch al backend...");
            
            // Aquí irá tu fetch real cuando el backend esté listo:
            /*
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) throw new Error("Error en el registro");
            const data = await response.json();
            */

            console.log("¡Datos enviados con éxito!", formData);

            // Si el registro va bien, podemos enviar un mensaje al store global
            // usando la acción 'set_hello' que ya tienes en tu storeReducer
            
            // dispatch({ type: 'set_hello', payload: '¡Usuario registrado correctamente!' });
            
            alert("¡Usuario registrado con éxito!");
            
            // Aquí añadiremos el navigate('/login') de react-router-dom más adelante
            
        } catch (error) {
            console.error("Hubo un error:", error);
            alert("Error al registrar el usuario.");
        }
    };

    return (
        <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-3">Crear cuenta de Usuario</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre completo</label>
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
                    <label className="form-label">Correo electrónico</label>
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
                <button type="submit" className="btn btn-success w-100 mt-3">
                    Registrarme
                </button>
            </form>
        </div>
    );
};