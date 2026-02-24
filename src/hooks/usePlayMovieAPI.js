import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMovieList } from "../utils/store/movieSlice";
import apiClient from "../utils/API/apiClient";

const usePlayMovieAPI = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state?.movie?.movieList);

  useEffect(() => {
    const playMovie = async () => {
      const res = await apiClient("now_playing?page=1")
      dispatch(addMovieList(res?.results));
    };
    playMovie();
  }, [dispatch]);

  return movie;
};

export default usePlayMovieAPI;
