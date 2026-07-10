import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { BASE_BACK_URL } from "../core/constantsUrl";
import { toast } from "react-toastify";

export const Success = () => {
    useEffect(() => {
        const confirmPurchase = async () => {
            try {
                const response = await fetch(`${BASE_BACK_URL}api/confirm-purchase`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user_id: 1, 
                        event_id: localStorage.getItem("last_event_id") 
                    }),
                });
                const data = await response.json();
                if (response.ok) {
                    console.log("¡Compra guardada en la base de datos!");
                    toast.success("Pay successful!");
                    localStorage.removeItem("last_event_id");
                } 
                else {
                    toast.error(data.msg || "Error with payload")

                }
            } catch (error) {
                console.error("Error al confirmar:", error);
            }
        };

        confirmPurchase();
    }, []);

    return (
        <div className="container mt-5 text-center">
            <h1>¡Pago exitoso!</h1>
            <p>Gracias por tu compra. Tu entrada ya está registrada.</p>

            <Link to="/" className="btn btn-primary mt-3">
                Volver a la página principal
            </Link>
        </div>
    );
};