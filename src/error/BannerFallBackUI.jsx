import React from "react";

const BannerFallBackUI = ({
    message = "Featured content unavailable",
}) => {
    return (
        <div className="relative h-[50vh] sm:h-[75vh] md:h-[85vh] w-full overflow-hidden">

            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />

            {/* Soft overlay texture effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-yellow-500 tracking-wide">
                    {message}
                </h1>
                <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-xl">
                   Helps you discover movies, get recommendations, and find showtimes. Explore our vast collection of films, read reviews, and create your watchlist. Your ultimate movie companion!
                </p>
            </div>
        </div>
    );
};

export default BannerFallBackUI;
