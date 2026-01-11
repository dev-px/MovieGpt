import React from "react";
import Header from "./Header";
import usePlayMovieAPI from "../hooks/usePlayMovieAPI";
import TrailerBrowse from "./TrailerBrowse";
import MovieBrowse from "./MovieBrowse";

const Browse = () => {
  const movieList = usePlayMovieAPI();

  return (
    <>
      <Header />
      <TrailerBrowse movies={movieList} />
      <MovieBrowse />
    </>
  );
};

export default Browse;
