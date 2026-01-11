import { useEffect } from "react";
import { addMovieForTrailer, addTrailer } from "../utils/movieSlice";
import { useDispatch } from "react-redux";
import { options } from "../utils/constant";

const useTrailerAPI = (movies) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!movies || movies.length === 0) return;
    const index = Math.floor(Math.random() * movies.length);
    const movie = movies[index];
    dispatch(addMovieForTrailer(movie));
    const trailerAPI = async (movieIdx) => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieIdx}/videos`,
        options
      );
      const json = await data.json();
      let trailerData = json?.results?.filter(
        (item) => item.type === "Trailer"
      );
      trailerData =
        trailerData.length > 0 ? trailerData[0]?.key : json?.results[0]?.key;
      dispatch(addTrailer(trailerData));
    };
    trailerAPI(movie.id);
  }, [movies, dispatch]);
};

export default useTrailerAPI;
