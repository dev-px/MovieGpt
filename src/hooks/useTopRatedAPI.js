import { options } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovieList } from "../utils/movieSlice";
import { useEffect } from "react";

const useTopRatedAPI = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state?.movie?.topRatedMovieList);

  useEffect(() => {
    const topRatedMovie = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?page=1",
        options
      );
      const movieData = await data.json();
      dispatch(addTopRatedMovieList(movieData?.results));
    };
    topRatedMovie();
  }, [dispatch]);

  return movie;
};

export default useTopRatedAPI;
