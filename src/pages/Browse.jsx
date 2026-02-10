import React from "react";
import Header from "../components/Header";
import usePlayMovieAPI from "../hooks/usePlayMovieAPI";
import TrailerBrowse from "../components/TrailerBrowse";
import MovieBrowse from "../components/MovieBrowse";

const Browse = () => {
  const movieList = usePlayMovieAPI();

  return (
    <>
      <TrailerBrowse movies={movieList} />
      <MovieBrowse />
    </>
  );
};

export default Browse;