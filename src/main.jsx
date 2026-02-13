import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/store/AppStore.js'
import AppErrorBoundary from './error/AppErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={appStore}>
    <AppErrorBoundary >
      <App />
    </AppErrorBoundary>
  </Provider>

  // </StrictMode>
)

// Strict Mode
// StrictMode is a tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants.
// StrictMode does not render any visible UI. It only activates additional checks and warnings for its descendants. 
// It helps to identify unsafe lifecycles, legacy API usage, and other potential issues in the application during development. 
// It is recommended to use StrictMode in development mode to catch potential issues early on, but it can be omitted in production mode for better performance.
// because of StrictMode we have useEffect called twice in development mode but in production it will be called once
// because of this our fetch call is happening twice in development mode and when we console anything we see it twice
// to avoid this we can either remove StrictMode or we can use a ref to track if useEffect has already run
// but it's better to keep StrictMode for finding potential problems in our app during development


// React Error boundary --> Third party library used
// We can't use error boundaries in functional components, they can only be used in class components. 
// Reason is that error boundaries rely on lifecycle methods like componentDidCatch and getDerivedStateFromError, which are only available in class components.
// componentDidCatch --> This lifecycle method is called when an error is thrown in a child component. It receives the error and the info about the component stack as arguments. It allows us to log the error or perform any side effects when an error occurs.
// getDerivedStateFromError --> This lifecycle method is called when an error is thrown in a child component. It receives the error as an argument and allows us to update the state of the error boundary component to display a fallback UI.
// also, error boundaries are designed to catch errors in the rendering phase, lifecycle methods, and constructors of the whole tree below them. They do not catch errors in event handlers, asynchronous code, server-side rendering, or errors thrown in the error boundary itself.
// Error boundaries exist even before hooks were introduced in React, and they were designed to work with class components. Since functional components do not have the same lifecycle methods as class components, it is not possible to implement error boundaries in functional components without using a third-party library or custom implementation.
// So to achieve this in functional components we can use a third party library called react-error-boundary which provides a hook called useErrorBoundary that allows us to catch errors in functional components and display a fallback UI.
// react error boundary is a component that catches JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. 
// It helps to prevent the entire app from crashing when an error occurs in a specific part of the UI.
// Here we apply error boundary at the root level of our app so that if any error occurs in any part of our app, it will be caught by the error boundary and it will display a fallback UI instead of crashing the entire app.