import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovieList } from "../utils/store/movieSlice";
import apiClient from "../utils/API/apiClient";

const usePopularAPI = () => {
  const dispatch = useDispatch();
  const [popularLoading, setPopularLoading] = useState(true);
  const [pError, setPError] = useState(false);
  const movie = useSelector((state) => state?.movie?.popularMovieList);

  useEffect(() => {
    try {
      setPError(false);
      const popularMovie = async () => {
        const res = await apiClient("popular?page=1")
        dispatch(addPopularMovieList(res?.results));
        if (res) setPopularLoading(false);
      }
      popularMovie();
    } catch (err) {
      setPError(true);
    }

  }, [dispatch]);


  return { popularMovie: movie, popularLoading, pError };
};

export default usePopularAPI;