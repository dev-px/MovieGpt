import React from "react";
import MovieBrowseCard from "./MovieBrowseCard";
import useUpcomingMovieAPI from "../hooks/useUpcomingAPI";
import { useSelector } from "react-redux";
import usePopularAPI from "../hooks/usePopularAPI";
import useTopRatedAPI from "../hooks/useTopRatedAPI";
import { translateLang } from "../utils/Constant";

const MovieBrowse = () => {
  const movies = useSelector((state) => state?.movie?.movieList);
  const langPref = useSelector((state) => state?.appPrefernce.language);
  const transLang = translateLang[langPref];
  const { upcomingMovie, upcomingLoading } = useUpcomingMovieAPI();
  const { popularMovie, popularLoading } = usePopularAPI();
  const { topRatedMovie, topRatedLoading } = useTopRatedAPI();
  return (
    <>
      <div className="bg-black text-white flex flex-col gap-6 !pb-16">
        <div className="!-mt-20 z-10">
          {movies && (
            <MovieBrowseCard
              movie={movies}
              title={transLang?.["Browse Movies"]}
              loading={movies?.length === 1}
            />
          )}
        </div>
        {popularMovie && (
          <MovieBrowseCard
            movie={popularMovie}
            title={transLang?.["Popular Movies"]}
            loading={popularLoading}
          />
        )}
        {topRatedMovie && (
          <MovieBrowseCard
            movie={topRatedMovie}
            title={transLang?.["Top Rated Movies"]}
            loading={topRatedLoading}
          />
        )}
        {upcomingMovie && (
          <MovieBrowseCard
            movie={upcomingMovie}
            title={transLang?.["Upcoming Movies"]}
            loading={upcomingLoading}
          />
        )}
      </div>
    </>
  );
};

export default MovieBrowse;
