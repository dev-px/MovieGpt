import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovieList } from "../utils/store/movieSlice";
import { useEffect, useState } from "react";
import apiClient from "../utils/API/apiClient";

const useTopRatedAPI = () => {
  const dispatch = useDispatch();
  const [topRatedLoading, setTopRatedLoading] = useState(true);
  const [tError, setTError] = useState(false);
  const movie = useSelector((state) => state?.movie?.topRatedMovieList);

  useEffect(() => {
    try {
      setTError(false);
      const topRatedMovie = async () => {
        const res = await apiClient("top_rated?page=1")
        dispatch(addTopRatedMovieList(res?.results));
        if (res) setTopRatedLoading(false);
      };
      topRatedMovie();
    } catch (err) {
      setTError(true);
    }
  }, [dispatch]);

  return { topRatedMovie: movie, topRatedLoading, tError };
};

export default useTopRatedAPI;
