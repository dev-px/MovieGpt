import { options } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovieList } from "../utils/store/movieSlice";
import { useEffect, useState } from "react";

const useTopRatedAPI = () => {
  const dispatch = useDispatch();
  const [topRatedLoading, setTopRatedLoading] = useState(true);
  const movie = useSelector((state) => state?.movie?.topRatedMovieList);

  useEffect(() => {
    const topRatedMovie = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?page=1",
        options
      );
      const movieData = await data.json();
      dispatch(addTopRatedMovieList(movieData?.results));
      if (movieData) setTopRatedLoading(false);
    };
    topRatedMovie();
  }, [dispatch]);

  return { topRatedMovie: movie, topRatedLoading };
};

export default useTopRatedAPI;
