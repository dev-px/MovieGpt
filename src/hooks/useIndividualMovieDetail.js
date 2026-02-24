import { useEffect, useState } from "react";
import { options } from "../utils/Constant";
import { movieIdValidator } from "../utils/Validate";

const useIndividualMovieDetail = (movieId) => {
    const [movieDetails, setMovieDetails] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const [detailsError, setDetailsError] = useState(false);

    useEffect(() => {
        if (!movieId) return;
        if (movieIdValidator(movieId)) {
            setDetailsError(true);
            return;
        }

        // It creates a cancel token for a fetch request.
        // It allows you to stop an API request before it finisheshing, which is useful if the component unmounts or if the movieId changes before the fetch completes. 
        // This helps prevent memory leaks and avoids trying to update state on an unmounted component.
        const controller = new AbortController();

        const fetchMovieDetails = async () => {
            try {
                setDetailsLoading(true);
                setDetailsError(false);

                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                    { ...options, signal: controller.signal, }
                );

                if (!response.ok) throw new Error;

                const data = await response.json();
                setMovieDetails(data);

            } catch (error) {
                if (error.name !== "AbortError") return;
                setDetailsError(true);
            } finally {
                setDetailsLoading(false);
            }
        };

        fetchMovieDetails();

        return () => controller.abort(); // cleanup
    }, [movieId]);

    return { movieDetails, detailsLoading, detailsError };
};

export default useIndividualMovieDetail;


// abort controller → cancel ongoing fetch on component unmount or id change and prevent state updates on unmounted component
// for example, if user quickly navigates between movies,
// like movie 1 → movie 2 → movie 3, the fetch for movie 1 and movie 2 will be aborted when movie 3's fetch starts,
// ensuring only the latest movie details are loaded and preventing potential memory leaks or errors from trying to update state on an unmounted component.
// without abort controller, all three fetches would complete and try to update state, which could lead to
// race conditions, memory leaks, or errors if the component unmounts before the fetch completes.
// without UI may end up showing details of movie 1 or movie 2 even though user is on movie 3, which is a bad user experience.