import { options } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovieList } from "../utils/movieSlice";
import { useEffect } from "react";

const useUpcomingMovieAPI = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state?.movie?.upcomingMovieList);

  useEffect(() => {
    const upcomingMovie = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        options
      );
      const movieData = await data.json();
      dispatch(addUpcomingMovieList(movieData?.results));
    };
    upcomingMovie();
  }, [dispatch]);

  return movie;
};

export default useUpcomingMovieAPI;
