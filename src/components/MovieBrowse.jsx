import React from "react";
import MovieBrowseCard from "./MovieBrowseCard";
import useUpcomingMovieAPI from "../hooks/useUpcomingAPI";
import { useSelector } from "react-redux";
import usePopularAPI from "../hooks/usePopularAPI";
import useTopRatedAPI from "../hooks/useTopRatedAPI";
import { translateLang } from "../utils/Constant";

const MovieBrowse = () => {
  const langPref = useSelector((state) => state?.appPrefernce.language);
  const transLang = translateLang[langPref];

  const browseMovie = useSelector((state) => state?.movie?.movieList);
  const { upcomingMovie, upcomingLoading, uError } = useUpcomingMovieAPI();
  const { popularMovie, popularLoading, pError } = usePopularAPI();
  const { topRatedMovie, topRatedLoading, tError } = useTopRatedAPI();

  return (
    <>
      <div className="bg-black text-white flex flex-col gap-6 !pb-16">
        {browseMovie && (
          <MovieBrowseCard
            movie={browseMovie}
            title={transLang?.["Browse Movies"]}
            loading={browseMovie?.length === 1}
            error={browseMovie?.length === 1}
          />
        )}
        {popularMovie && (
          <MovieBrowseCard
            movie={popularMovie}
            title={transLang?.["Popular Movies"]}
            loading={popularLoading}
            error={pError}
          />
        )}
        {topRatedMovie && (
          <MovieBrowseCard
            movie={topRatedMovie}
            title={transLang?.["Top Rated Movies"]}
            loading={topRatedLoading}
            error={tError}
          />
        )}
        {upcomingMovie && (
          <MovieBrowseCard
            movie={upcomingMovie}
            title={transLang?.["Upcoming Movies"]}
            loading={upcomingLoading}
            error={uError}
          />
        )}
      </div>
    </>
  );
};

export default MovieBrowse;
