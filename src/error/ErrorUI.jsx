import React from 'react'

const ErrorUI = ({ message = "Something went wrong." }) => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md w-full bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-800">

                <div className="text-red-500 text-5xl mb-4">
                    ⚠️
                </div>

                <h2 className="text-xl font-semibold mb-2 text-white">
                    Oops!
                </h2>

                <p className="text-gray-400 mb-6 text-sm">
                    {message}
                </p>

                <div className="flex gap-3 justify-center">
                    {/* {onRetry && (
                        <button
                            onClick={onRetry}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        >
                            Try Again
                        </button>
                    )} */}

                    <button
                        onClick={() => window.location.href = "/"}
                        className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition"
                    >
                        Go Home
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ErrorUI;

// ErrorBoundary:
// - React-level crash
// - Unexpected
// - Defensive safety net
// if some component throws inside render lifecycle. That is a React rendering failure.
// "React cannot safely render this tree." --> Then ErrorBoundary catches it and shows fallback UI.

// ErrorBoundary does NOT catch:
// - async errors
// - fetch promise rejections
// - event handler errors
// It only catches rendering errors.


// ERROR UI ----------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>

// API Error UI:
// - Expected failure
// - Network issue
// - Backend issue
// - Handled intentionally
// - It handles unknown errors gracefully.
// - It keeps UX intact instead of crashing the app.

// If you don’t set an error state, your component might still:
// - Show old data
// - Show loading forever
// - Or render empty UI

// Toast is used for feedback or notification, but rendering is controlled by state here we use Error UI if API Error comes handle with Error UI.
