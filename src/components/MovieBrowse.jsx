import React from "react";
import MovieBrowseCard from "./MovieBrowseCard";
import useUpcomingMovieAPI from "../hooks/useUpcomingAPI";
import { useSelector } from "react-redux";
import usePopularAPI from "../hooks/usePopularAPI";
import useTopRatedAPI from "../hooks/useTopRatedAPI";

const MovieBrowse = () => {
  const movies = useSelector((state) => state?.movie?.movieList);
  const upcomingMovie = useUpcomingMovieAPI();
  const popularMovie = usePopularAPI();
  const topRatedMovie = useTopRatedAPI();
  return (
    <>
      <div className="bg-black text-white flex flex-col gap-6 !pb-16">
        <div className="!-mt-20 z-10">
          {movies && <MovieBrowseCard movie={movies} title="Browse Movies" />}
        </div>
        {popularMovie && (
          <MovieBrowseCard movie={popularMovie} title="Popular" />
        )}
        {topRatedMovie && (
          <MovieBrowseCard movie={topRatedMovie} title="Top Rated" />
        )}
        {upcomingMovie && (
          <MovieBrowseCard movie={upcomingMovie} title="Upcoming" />
        )}
      </div>
    </>
  );
};

export default MovieBrowse;
