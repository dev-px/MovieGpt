import React from 'react'

const Trailer = ({ trailerKey }) => {
    console.log(trailerKey)
    return (
        <iframe
            className="w-screen aspect-video scale-150"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=0&playlist=${trailerKey}`}
            allow="autoplay"
            allowFullScreen
        />
    )
}

export default Trailer