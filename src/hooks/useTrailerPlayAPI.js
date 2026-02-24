import { useState, useEffect } from "react";
import { options } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { addTrailer } from "../utils/store/movieSlice";

const useIndividualMovieDetail = (movieId) => {
    const [detailsLoader, setDetailsLoader] = useState(true);
    const [trailerKey, setTrailerKey] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (!movieId) return;

        const controller = new AbortController();

        const fetchDetails = async () => {
            try {
                setTrailerKey("");
                setDetailsLoader(true);
                setError(false);

                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`,
                    { ...options, signal: controller.signal }
                );

                const json = await res.json();
                const trailerData = json?.results?.filter(
                    (item) =>
                        item.type === "Trailer" &&
                        item.site === "YouTube" &&
                        item.official === true
                );

                const trailerDataKey = trailerData.length > 0 ?
                    trailerData[0]?.key : json?.results[0]?.key;

                dispatch(addTrailer(trailerDataKey));
                setTrailerKey(trailerDataKey);
            } catch (err) {
                // err.name === "AbortError" we return because this is expected error as when user try to naviaget movies too fast 
                // 2-3 API calls it cancel all the previous api calls and run the current API calls 
                if (err.name === "AbortError") return;
                setError(true);
            } finally {
                setDetailsLoader(false);
            }
        };

        fetchDetails();

        return () => {
            controller.abort();
        };

    }, [dispatch, movieId]);

    return { trailerKey, detailsLoader, error };
};

export default useIndividualMovieDetail;
