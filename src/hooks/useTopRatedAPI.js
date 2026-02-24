import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovieList } from "../utils/store/movieSlice";
import { useEffect, useState } from "react";
import apiClient from "../utils/API/apiClient";
import { toast } from "react-toastify";
import { toastVisibilty } from "../utils/Helper";

const useTopRatedAPI = () => {
  const dispatch = useDispatch();
  const [topRatedLoading, setTopRatedLoading] = useState(true);
  const movie = useSelector((state) => state?.movie?.topRatedMovieList);

  useEffect(() => {
    try {
      const topRatedMovie = async () => {
        const res = await apiClient("top_rated?page=1")
        dispatch(addTopRatedMovieList(res?.results));
        if (res) setTopRatedLoading(false);
      };
      topRatedMovie();
    } catch (err) {
      toast.error("Failed to load the movie", toastVisibilty);
    }
  }, [dispatch]);

  return { topRatedMovie: movie, topRatedLoading };
};

export default useTopRatedAPI;
