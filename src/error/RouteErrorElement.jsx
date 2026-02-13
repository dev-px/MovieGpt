import React from "react";
import { useNavigate } from "react-router-dom";

const RouteErrorElement = () => {
    // const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-black text-white px-6 text-center">
            <h1 className="text-5xl font-bold text-red-600">
                Something Went Wrong
            </h1>

            <p className="text-lg text-gray-300 mb-2">
                An error occurred while loading this page.
            </p>

            <button
                onClick={() => navigate("/")}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md font-semibold transition"
            >
                Go Home
            </button>
        </div>
    );
};

export default RouteErrorElement;


// Route-level failure → errorElement
// Component crash → ErrorBoundary
// API failure → try/catch + toast
// Auth failure → ProtectedLayout(AuthWrapper)