import React from 'react'
import { ToastContainer } from 'react-toastify'

const Toast = () => {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Toast;