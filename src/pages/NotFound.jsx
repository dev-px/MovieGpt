import React from 'react'
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center bg-black ">
      <h1 className="text-4xl font-bold text-yellow-500">404 - Page Not Found</h1>
      <button
        onClick={() => navigate("/")}
        className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-md font-semibold transition text-yellow-500"
      >
        Go Home
      </button>
    </div>
  )
}

export default NotFound