import React from 'react'
import { NTFLX_BG } from '../utils/Constant'

const Background = () => {
    return (
        <>
            <img
                src={NTFLX_BG}
                alt="Background"
                className="absolute inset-0 object-cover h-full w-full"
            />
            <div className="absolute bg-black/50 inset-0 " />
        </>
    )
}

export default Background