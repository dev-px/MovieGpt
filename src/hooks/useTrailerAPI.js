import { useEffect } from "react";
import { addMovieForTrailer } from "../utils/store/movieSlice";
import { useDispatch } from "react-redux";

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
      sessionStorage.setItem("bannerMovie", JSON.stringify(movie), { expires: 1 });
    } else {
      movie = JSON.parse(storedMovie);
    }

    // Dispatch the selected movie to the Redux store
    dispatch(addMovieForTrailer(movie));

  }, [movies, dispatch]);

  return null;
};

export default useTrailerAPI;
