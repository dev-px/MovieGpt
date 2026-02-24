import React from "react";
import usePlayMovieAPI from "../hooks/usePlayMovieAPI";
import TrailerBrowse from "../components/TrailerBrowse";
import MovieBrowse from "../components/MovieBrowse";

const Browse = () => {
  const { movie, pmError } = usePlayMovieAPI();

  return (
    <>
      <TrailerBrowse movies={movie} pmError={pmError} />
      <MovieBrowse />
    </>
  );
};

export default Browse;