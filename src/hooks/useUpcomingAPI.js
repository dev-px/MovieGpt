import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovieList } from "../utils/store/movieSlice";
import { useEffect, useState } from "react";
import apiClient from "../utils/API/apiClient";

const useUpcomingMovieAPI = () => {
  const dispatch = useDispatch();
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const [uError, setUError] = useState(false);
  const movie = useSelector((state) => state?.movie?.upcomingMovieList);

  useEffect(() => {
    try {
      setUError(false);
      const upcomingMovie = async () => {
        const res = await apiClient("upcoming?page=1");
        dispatch(addUpcomingMovieList(res?.results));
        if (res?.results) setUpcomingLoading(false);
      };
      upcomingMovie();
    } catch (err) {
      setUError(true)
    }
  }, [dispatch]);

  return { upcomingMovie: movie, upcomingLoading, uError };
};

export default useUpcomingMovieAPI;
