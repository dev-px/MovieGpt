import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useIndividualMovieDetail from "../hooks/useIndividualMovieDetail";
import useTrailerPlayAPI from "../hooks/useTrailerPlayAPI";
import Trailer from "../components/Trailer";
import MovieDetailsShimmer from "../components/shimmer/MovieDetailsShimmer";
import ErrorUI from './../error/ErrorUI';
import BannerFallBackUI from "../error/BannerFallBackUI";
import { FaPlay } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { translator } from "../utils/Helper";
import { useSelector } from "react-redux";

const MovieDetails = () => {
    const { movieId } = useParams();
    const langPref = useSelector((state) => state?.appPrefernce.language);
    const [play, setPlay] = useState(false);
    const { movieDetails, detailsLoading, detailsError } = useIndividualMovieDetail(movieId);
    const { trailerKey, detailsLoader, error } = useTrailerPlayAPI(movieId);

    const {
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

    const heroMeta = [
        vote_average && (
            <span key="rating">
                <IoIosStar className="inline mr-1 " />
                {vote_average.toFixed(1)}
            </span>
        ),
        release_date && (
            <span key="year">
                {new Date(release_date).getFullYear()}
            </span>
        ),
        runtime && (
            <span key="runtime">
                {runtime} min
            </span>
        ),
        genres?.length && (
            <span key="genres">
                {genres.map((g) => g.name).join(", ")}
            </span>
        ),
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
    if ((!detailsLoader && detailsError) || (!detailsLoader && movieDetails == null)) {
        return (
            <div className="bg-black min-h-screen">
                <ErrorUI message={movieDetails == null && "We couldn't able to find the movie"} />
            </div>
        )
    }

    return (
        <div className="bg-black text-yellow-500 min-h-screen">

            {/* Image/Trailer container */}
            {error || !trailerKey ? (
                <BannerFallBackUI message={title} />
            ) : (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                    <div className="absolute bottom-6 sm:bottom-10 left-6 md:left-16 max-w-2xl md:max-w-3xl z-50">
                        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-3">
                            {title}
                        </h1>
                        {tagline && (
                            <p className="italic text-zinc-300 mb-3 text-sm md:text-base">
                                {tagline}
                            </p>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm md:text-base text-yellow-500 mb-4">
                            {heroMeta.map((item, index) => (
                                <span
                                    key={index}
                                    className="border border-yellow-500 px-2 py-0.5 rounded"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                        <button className="mt-3 text-black font-semibold sm:mt-4 cursor-pointer bg-yellow-500 hover:bg-yellow-600 
                            transition px-3 sm:px-5 py-2 sm:py-3 rounded-md text-sm sm:text-base" onClick={() => setPlay(true)}>
                            <span className="flex items-center justify-center gap-1">
                                <FaPlay className="" />

                                {translator(langPref, "Play")}
                            </span>
                        </button>
                    </div>
                </div>
            )
            }

            {/* Details Section */}
            <div className="px-6 sm:px-10 md:px-16 py-10 md:py-14 grid grid-cols-1 md:grid-cols-1 gap-10">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-3">
                            {translator(langPref, "Overview")}
                        </h2>
                        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                            {overview}
                        </p>
                    </div>

                    {/* Movie Details Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base text-zinc-300">
                        {detailsData.map((item, index) => (
                            <div
                                key={index}
                                className={item.fullWidth ? "sm:col-span-2" : ""}
                            >
                                <h3 className="text-yellow-500 font-semibold mb-1">
                                    {translator(langPref, item.label)}
                                </h3>
                                <p>{item.value}</p>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div >
    );
};

export default MovieDetails;
