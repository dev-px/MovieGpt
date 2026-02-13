import { options } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovieList } from "../utils/store/movieSlice";
import { useEffect, useState } from "react";

const useUpcomingMovieAPI = () => {
  const dispatch = useDispatch();
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const movie = useSelector((state) => state?.movie?.upcomingMovieList);

  useEffect(() => {
    const upcomingMovie = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        options
      );
      const movieData = await data.json();
      dispatch(addUpcomingMovieList(movieData?.results));
      if (movieData?.results) setUpcomingLoading(false);
    };
    upcomingMovie();
  }, [dispatch]);

  return { upcomingMovie: movie, upcomingLoading };
};

export default useUpcomingMovieAPI;
