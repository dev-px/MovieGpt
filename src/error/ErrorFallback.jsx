import React from 'react'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    console.error("Error caught by Error Boundary:", error, resetErrorBoundary);
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-red-600">
            <h1 className="text-4xl font-bold">Something went wrong. Please try again later.</h1>
        </div>
    )
}

export default ErrorFallback;