import { useSelector } from "react-redux";
import TrailerText from "./TrailerText";
import useTrailerAPI from "../hooks/useTrailerAPI";
import Trailer from "./Trailer";
import useTrailerPlayAPI from "../hooks/useTrailerPlayAPI"
import ErrorUI from "../error/ErrorUI";
import ShimmerBlock from "./ShimmerBlock";

const TrailerBrowse = ({ movies, pmError }) => {
  useTrailerAPI(movies);
  const store = useSelector((state) => state?.movie);
  const movieId = store?.movieForTrailer?.id;
  const { detailsLoading, error } = useTrailerPlayAPI(movieId);
  const trailerKey = store?.trailer;

  return (
    <div className="h-[50vh] sm:h-[75vh] md:h-[85vh] w-full !pt-2 relative !pb-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        {detailsLoading ? <ShimmerBlock className="w-full h-full" /> : <Trailer trailerKey={trailerKey} />}
      </div>
      <TrailerText loading={detailsLoading} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
    </div>
  );
};

export default TrailerBrowse;