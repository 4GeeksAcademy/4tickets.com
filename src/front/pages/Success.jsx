import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { BASE_BACK_URL } from "../core/constantsUrl";
import { toast } from "react-toastify";

export const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const confirmPurchase = async () => {
            if (!sessionId) {
                setError("No session ID found.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `${BASE_BACK_URL}api/confirm-purchase`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify({
                            session_id: sessionId
                        })
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setData(data);

                    console.log("¡Compra guardada en la base de datos!");
                    toast.success("Payment successful!");

                    localStorage.removeItem("last_event_id");
                } else {
                    const errorMessage =
                        data.msg ||
                        data.message ||
                        "Failed to confirm purchase.";

                    setError(errorMessage);
                    toast.error(errorMessage);
                }
            } catch (error) {
                console.error("Error al confirmar la compra:", error);

                setError("Network error. Please try again later.");
                toast.error("Network error. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        confirmPurchase();
    }, [sessionId]);

    if (loading) {
        return (
            <div className="container text-center my-5">
                <h2>Confirming your purchase...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container text-center my-5">
                <h2>Purchase confirmation error</h2>
                <p className="text-danger">{error}</p>

                <Link to="/" className="btn btn-primary">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container text-center my-5">
            <h1>Payment successful!</h1>

            <p>Your purchase has been confirmed.</p>

            {data?.ticket_code && (
                <div className="my-4">
                    <h4>Your ticket QR code</h4>

                    <div
                        style={{
                            background: "white",
                            padding: "16px",
                            display: "inline-block"
                        }}
                    >
                        <QRCode value={data.ticket_code} />
                    </div>

                    <p className="mt-3">
                        Ticket code: <strong>{data.ticket_code}</strong>
                    </p>
                </div>
            )}

            <Link to="/" className="btn btn-primary">
                Back to Home
            </Link>
        </div>
    );
};