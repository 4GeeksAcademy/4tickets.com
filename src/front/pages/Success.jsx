import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

export const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [ticketData, setTicketData] = useState(null);
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
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/confirm-purchase`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ session_id: sessionId }),
                });

                const data = await response.json();
                
                if (response.ok) {
                    setTicketData(data);
                } else {
                    setError(data.message || "Failed to confirm purchase.");
                }
            } catch (err) {
                setError("Network error. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        confirmPurchase();
    }, [sessionId]);

    return (
        <div className="container mt-5 text-center">
            {loading ? (
                <h1>Processing your payment...</h1>
            ) : error ? (
                <div className="alert alert-danger">
                    <h1>Payment Error</h1>
                    <p>{error}</p>
                    <Link to="/" className="btn btn-primary">Return to main page</Link>
                </div>
            ) : (
                <div>
                    <h1>Payment successful!</h1>
                    <p>Thank you for your purchase.</p>
                    <div className="my-4">
                        <p><strong>Your ticket code:</strong> {ticketData.ticket_code}</p>
                        <div style={{ background: 'white', padding: '16px', display: 'inline-block' }}>
                            <QRCode value={ticketData.ticket_code} />
                        </div>
                    </div>
                    <Link to="/" className="btn btn-primary">Return to main page</Link>
                </div>
            )}
        </div>
    );
};