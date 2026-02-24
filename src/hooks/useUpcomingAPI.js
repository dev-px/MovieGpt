import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovieList } from "../utils/store/movieSlice";
import { useEffect, useState } from "react";
import apiClient from "../utils/API/apiClient";
import { toast } from "react-toastify";
import { toastVisibilty } from "../utils/Helper";

const useUpcomingMovieAPI = () => {
  const dispatch = useDispatch();
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const movie = useSelector((state) => state?.movie?.upcomingMovieList);

  useEffect(() => {
    try {
      const upcomingMovie = async () => {
        const res = await apiClient("upcoming?page=1");
        dispatch(addUpcomingMovieList(res?.results));
        if (res?.results) setUpcomingLoading(false);
      };
      upcomingMovie();
    } catch (err) {
      toast.error("Failed to load movie", toastVisibilty)
    }
  }, [dispatch]);

  return { upcomingMovie: movie, upcomingLoading };
};

export default useUpcomingMovieAPI;
