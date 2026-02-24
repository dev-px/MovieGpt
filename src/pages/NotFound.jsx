import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-black ">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <button
        onClick={() => navigate("/")}
        className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md font-semibold transition text-white"
      >
        Go Home
      </button>
    </div>
  )
}

export default NotFound