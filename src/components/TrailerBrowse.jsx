import { useDispatch, useSelector } from "react-redux";
import TrailerText from "./TrailerText";
import useTrailerAPI from "../hooks/useTrailerAPI";
import Trailer from "./Trailer";
import { useEffect } from "react";
import { addTrailer } from "../utils/store/movieSlice";
import useTrailerPlayAPI from "../hooks/useTrailerPlayAPI"

const TrailerBrowse = ({ movies }) => {
  useTrailerAPI(movies);
  const dispatch = useDispatch();
  const store = useSelector((state) => state?.movie);
  const movieId = store?.movieForTrailer?.id;
  const fnGetTrailerKey = useTrailerPlayAPI(movieId);
  const trailerKey = store?.trailer;

  useEffect(() => {
    const getTrailerKey = async (movieIdx) => {
      const data = await fnGetTrailerKey(movieIdx);
      if (data) dispatch(addTrailer(data));
    }

    if (movieId) getTrailerKey(movieId);
  }, [dispatch, movieId])

  return (
    <div className="h-[50vh] sm:h-[75vh] md:h-[85vh] w-full !pt-2 relative !pb-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Trailer trailerKey={trailerKey} />
      </div>
      <TrailerText movieIdx={store?.movieIdx} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
    </div>
  );
};

export default TrailerBrowse;