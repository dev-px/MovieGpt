import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ErrorFallback'

const AppErrorBoundary = ({ children }) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {
            // Optional: we can reset state, clear store, refetch movie data etc.
            console.log("Resetting after error...");
        }}
        >
            {children}
        </ErrorBoundary>
    )
}

export default AppErrorBoundary;

// AppErrorBoundary (global)
//    Router (with errorElement)
//      Browse page
//        Section-level boundary (AI results --> GPT search) --> Protect only a complex page like GptSearch
//      Other stable components