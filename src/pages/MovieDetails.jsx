import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useIndividualMovieDetail from "../hooks/useIndividualMovieDetail";
import useTrailerPlayAPI from "../hooks/useTrailerPlayAPI";
import Trailer from "../components/Trailer";
import MovieDetailsShimmer from "../components/MovieDetailsShimmer";

// handle login logic
// error handling for api calls
// handle case when movie details are not found or api call fails
// Error and retry mechanism
// add icons


const MovieDetails = () => {
    const { movieId } = useParams();
    const [play, setPlay] = useState(false);
    const { movieDetails, detailsLoading } = useIndividualMovieDetail(movieId);
    const [trailerKey, setTrailerKey] = useState(null);
    const fnGetTrailerKey = useTrailerPlayAPI(movieId);
    const {
        id,
        title,
        backdrop_path,
        overview,
        tagline,
        vote_average,
        vote_count,
        runtime,
        release_date,
        genres,
        production_companies,
        spoken_languages,
    } = movieDetails || {};

    const backdropURL = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    useEffect(() => {
        const getTrailerKey = async () => {
            const data = await fnGetTrailerKey(id);
            if (data) setTrailerKey(data);
        };
        getTrailerKey();
    }, [play])

    const heroMeta = [
        vote_average && `⭐ ${vote_average.toFixed(1)}`,
        release_date && new Date(release_date).getFullYear(),
        runtime && `${runtime} min`,
        genres?.length && genres.map((g) => g.name).join(", "),
    ].filter(Boolean);

    const detailsData = [
        {
            label: "Release Date",
            value: release_date,
        },
        {
            label: "Runtime",
            value: runtime ? `${runtime} minutes` : null,
        },
        {
            label: "Language",
            value: spoken_languages?.length
                ? spoken_languages.map((l) => l.english_name).join(", ")
                : null,
        },
        {
            label: "Rating",
            value: vote_average
                ? `${vote_average.toFixed(1)} / 10 (${vote_count} votes)`
                : null,
        },
        {
            label: "Production",
            value: production_companies?.length
                ? production_companies.map((c) => c.name).join(", ")
                : null,
            fullWidth: true,
        },
    ].filter((item) => item.value);

    if (detailsLoading) return <MovieDetailsShimmer />

    return (
        <div className="bg-black text-white min-h-screen">

            {/* Image/Trailer container */}
            <div className="relative h-[50vh] sm:h-[75vh] md:h-[85vh] w-full overflow-hidden">
                {
                    play ? (
                        <Trailer trailerKey={trailerKey} />
                    ) :
                        (
                            <img
                                src={backdropURL}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        )
                }

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                <div className="absolute bottom-6 sm:bottom-10 left-6 md:left-16 max-w-2xl md:max-w-3xl z-50">
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-3">
                        {title}
                    </h1>

                    {tagline && (
                        <p className="italic text-gray-300 mb-3 text-sm md:text-base">
                            {tagline}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm md:text-base text-gray-300 mb-4">
                        {heroMeta.map((item, index) => (
                            <span
                                key={index}
                                className="border border-gray-400 px-2 py-0.5 rounded"
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    <button className="mt-3 sm:mt-4 cursor-pointer bg-red-600 hover:bg-red-700 transition px-5 sm:px-6 py-2 sm:py-3 rounded-md font-semibold text-sm sm:text-base" onClick={() => setPlay(true)}>
                        ▶ Play
                    </button>
                </div>
            </div>

            {/* Details Section */}
            <div className="px-6 sm:px-10 md:px-16 py-10 md:py-14 grid grid-cols-1 md:grid-cols-1 gap-10">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-3">
                            Overview
                        </h2>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                            {overview}
                        </p>
                    </div>

                    {/* Movie Details Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base text-gray-300">
                        {detailsData.map((item, index) => (
                            <div
                                key={index}
                                className={item.fullWidth ? "sm:col-span-2" : ""}
                            >
                                <h3 className="text-white font-semibold mb-1">
                                    {item.label}
                                </h3>
                                <p>{item.value}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
