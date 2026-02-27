import React from 'react'
import { useNavigate } from 'react-router-dom';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    const navigate = useNavigate();
    console.error("Error caught by Error Boundary:", error, resetErrorBoundary);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-yellow-500">
            <h1 className="text-4xl font-bold">Something went wrong. Please try again later.</h1>
            <button
                onClick={() => navigate("/")}
                className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-md font-semibold transition"
            >
                Go Home
            </button>
        </div>
    )
}

export default ErrorFallback;