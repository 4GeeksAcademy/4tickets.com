import React, { useEffect } from "react";

export const Success = () => {
    useEffect(() => {
        const confirmPurchase = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/confirm-purchase`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user_id: 1, 
                        event_id: localStorage.getItem("last_event_id") 
                    }),
                });
                if (response.ok) {
                    console.log("¡Compra guardada en la base de datos!");
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
        </div>
    );
};