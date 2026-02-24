import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovieList } from "../utils/store/movieSlice";
import apiClient from "../utils/API/apiClient";

const usePlayMovieAPI = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state?.movie?.movieList);
  const [pmError, setPmError] = useState(false);

  useEffect(() => {
    try {
      const playMovie = async () => {
        setPmError(false)
        const res = await apiClient("now_playing?page=1")
        dispatch(addMovieList(res?.results));
      };
      playMovie();
    } catch (err) {
      setPmError(true);
    }
  }, [dispatch]);

  return { movie, pmError };
};

export default usePlayMovieAPI;
