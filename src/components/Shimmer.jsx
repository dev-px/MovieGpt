import React from 'react'

const Shimmer = () => {
    return (
        <div className="">
            <div className="flex gap-4 overflow-x-scroll hide-scrollbar">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index}
                        className="w-[150px] h-[200px] bg-gray-500 rounded-md animate-pulse !z-20"
                    />
                ))}
            </div>
        </div>
    );
};

export default Shimmer;