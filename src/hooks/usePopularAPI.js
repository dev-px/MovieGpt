import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/Constant";
import { addPopularMovieList } from "../utils/store/movieSlice";

const usePopularAPI = () => {
  const dispatch = useDispatch();
  const [popularLoading, setPopularLoading] = useState(true);
  const movie = useSelector((state) => state?.movie?.popularMovieList);

  useEffect(() => {
    const popularMovie = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        options
      );
      const movieData = await data.json();
      dispatch(addPopularMovieList(movieData?.results));
      if (movieData) setPopularLoading(false);
    };
    popularMovie();
  }, [dispatch]);

  return { popularMovie: movie, popularLoading };
};

export default usePopularAPI;
