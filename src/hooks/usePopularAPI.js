import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovieList } from "../utils/store/movieSlice";
import apiClient from "../utils/API/apiClient";
import { toastVisibilty } from "../utils/Helper";
import { toast } from "react-toastify";

const usePopularAPI = () => {
  const dispatch = useDispatch();
  const [popularLoading, setPopularLoading] = useState(true);
  const movie = useSelector((state) => state?.movie?.popularMovieList);

  useEffect(() => {
    try {
      const popularMovie = async () => {
        const res = await apiClient("popular?page=1")
        dispatch(addPopularMovieList(res?.results));
        if (res) setPopularLoading(false);
      }
      popularMovie();
    } catch (err) {
      toast.error("Failed to load the movie", toastVisibilty);
    }

  }, [dispatch]);


  return { popularMovie: movie, popularLoading };
};

export default usePopularAPI;
