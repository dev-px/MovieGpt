import React from 'react'

const ShimmerBlock = ({ className }) => (
    <div
        className={`bg-gray-800/60 animate-pulse rounded ${className}`}
    />
);

export default ShimmerBlock;