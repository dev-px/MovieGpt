import { useSelector } from "react-redux";
import TrailerText from "./TrailerText";
import useTrailerAPI from "../hooks/useTrailerAPI";

const TrailerBrowse = ({ movies }) => {
  useTrailerAPI(movies);
  const trailerKey = useSelector((state) => state?.movie?.trailer);

  return (
    <div className="!h-1/2 w-full !pt-2 relative !pb-0 overflow-hidden bg-[rgba(0,0,0,0.15)]">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <iframe
          className="w-screen aspect-video scale-150"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=0&playlist=${trailerKey}`}
          allow="autoplay"
          allowFullScreen
        />
      </div>
      <TrailerText />
    </div>
  );
};

export default TrailerBrowse;
