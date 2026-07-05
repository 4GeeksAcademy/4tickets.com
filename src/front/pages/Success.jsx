import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import QRCode from "react-qr-code";

export const Success = () => {
    const [searchParams] = useSearchParams();
    const ticketCode = searchParams.get("ticket_code");

    useEffect(() => {
        const confirmPurchase = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/confirm-purchase`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        event_id: localStorage.getItem("last_event_id"),
                        ticket_code: ticketCode
                    }),
                });
                if (response.ok) {
                    localStorage.removeItem("last_event_id");
                }
            } catch (error) {
                console.error("Confirmation error:", error);
            }
        };

        if (ticketCode) confirmPurchase();
    }, [ticketCode]);

    return (
        <div className="container mt-5 text-center">
            <h1>Payment successful!</h1>
            <p>Thank you for your purchase.</p>

            {ticketCode && (
                <div className="my-4">
                    <p><strong>Your ticket code:</strong> {ticketCode}</p>
                    <div style={{ background: 'white', padding: '16px' }}>
                        <QRCode value={ticketCode} size={150} />
                    </div>
                </div>
            )}

            <Link to="/" className="btn btn-primary mt-3">Return to main page</Link>
        </div>
    );
};