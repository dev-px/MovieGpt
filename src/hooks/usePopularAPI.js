import { options } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovieList } from "../utils/movieSlice";
import { useEffect } from "react";

const usePopularAPI = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state?.movie?.popularMovieList);

  useEffect(() => {
    const popularMovie = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        options
      );
      const movieData = await data.json();
      dispatch(addPopularMovieList(movieData?.results));
    };
    popularMovie();
  }, [dispatch]);

  return movie;
};

export default usePopularAPI;
