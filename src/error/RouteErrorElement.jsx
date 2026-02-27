import React from "react";
import { useNavigate } from "react-router-dom";

const RouteErrorElement = () => {
    // const error = useRouteError();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-black text-yellow-500 px-6 text-center">
            <h1 className="text-5xl font-bold text-yellow-500">
                Something Went Wrong
            </h1>

            <p className="text-lg text-gray-300 mb-2">
                An error occurred while loading this page.
            </p>

            <button
                onClick={() => navigate("/")}
                className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-md font-semibold transition"
            >
                Go Home
            </button>
        </div>
    );
};

export default RouteErrorElement;


// Route-level failure → errorElement
// Component crash → AppErrorBoundary
// API failure → try/catch + toast
// Auth failure → ProtectedLayout(AuthWrapper)