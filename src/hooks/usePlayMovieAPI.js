import { options } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addMovieList } from "../utils/store/movieSlice";
import { useEffect } from "react";

const usePlayMovieAPI = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state?.movie?.movieList);

  useEffect(() => {
    const playMovie = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        options
      );
      const movieData = await data.json();
      dispatch(addMovieList(movieData?.results));
    };
    playMovie();
  }, [dispatch]);

  return movie;
};

export default usePlayMovieAPI;
