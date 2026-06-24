import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Layout = () => {

    const { dispatch } = useGlobalReducer();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/event`);
                if (!response.ok) {
                    const text = await response.text();
                    throw new Error(`HTTP ${response.status}: ${text}`);
                }

                const data = await response.json();
                dispatch({ type: "set_events", payload: data });
            } catch (error) {
                console.error("Error cargando eventos:", error);
            }
        };
        
        fetchEvents();
    }, [dispatch]);

    return (
        <ScrollToTop>
            <Navbar />
            <div className="bg-primary-subtle p-4">
                <Outlet />
            </div>
            <Footer />
        </ScrollToTop>
    );
};