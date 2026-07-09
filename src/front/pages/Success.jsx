import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

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
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/confirm-purchase`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ session_id: sessionId }),
                });
                const result = await response.json();
                if (response.ok) setData(result);
                else setError(result.message || "Failed to confirm purchase.");
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
                    <h1>Payment successful! 🎉</h1>
                    <p>Thank you for your purchase of <strong>{data.event?.title}</strong>.</p>
                    <div className="row justify-content-center my-4">
                        {data.tickets.map((ticket, index) => (
                            <div key={ticket.id} className="col-md-4 mb-4">
                                <div className="card p-3 shadow-sm">
                                    <h5>Ticket #{index + 1}</h5>
                                    <div style={{ background: 'white', padding: '16px', display: 'inline-block', margin: '0 auto' }}>
                                        <QRCode value={ticket.ticket_code} size={160} />
                                    </div>
                                    <p className="mt-3"><strong>Code:</strong> {ticket.ticket_code}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/" className="btn btn-primary">Return to main page</Link>
                </div>
            )}
        </div>
    );
};