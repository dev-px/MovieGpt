import { useEffect } from "react";
import { addMovieForTrailer, addTrailer } from "../utils/store/movieSlice";
import { useDispatch } from "react-redux";
import { options } from "../utils/constant";

const useTrailerAPI = (movies) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!movies || movies.length === 0) return;
    // check if banner movie is already stored in session storage
    const storedMovie = sessionStorage.getItem("bannerMovie");
    let movie;

    // if not stored, select a random movie and store it
    if (!storedMovie) {
      const index = Math.floor(Math.random() * movies.length);
      movie = movies[index];
      sessionStorage.setItem("bannerMovie", JSON.stringify(movie));
    } else {
      movie = JSON.parse(storedMovie);
    }

    // Dispatch the selected movie to the Redux store
    dispatch(addMovieForTrailer(movie));

    const trailerAPI = async (movieIdx) => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieIdx}/videos`,
        options
      );
      const json = await data.json();
      let trailerData = json?.results?.filter(
        (item) =>
          item.type === "Trailer" &&
          item.site === "YouTube" &&
          item.official === true
      );
      trailerData =
        trailerData.length > 0 ? trailerData[0]?.key : json?.results[0]?.key;
      dispatch(addTrailer(trailerData));
    };

    trailerAPI(movie.id);
  }, [movies, dispatch]);
};

export default useTrailerAPI;
