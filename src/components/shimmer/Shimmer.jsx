import React from 'react'
import ShimmerBlock from './ShimmerBlock';

const Shimmer = () => {
    return (
        <div className="">
            <div className="flex gap-4 overflow-x-scroll hide-scrollbar">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ShimmerBlock key={index} className="w-[150px] h-[200px] !z-20 rounded-sm" />
                ))}
            </div>
        </div>
    );
};

export default Shimmer;