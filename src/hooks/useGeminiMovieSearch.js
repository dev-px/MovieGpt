import { options } from "../utils/constant";

const useTmdbMovieSearch = () => {
    const fetchTmdbAPI = async (movieTitles = []) => {
        if (!movieTitles.length) return [];
        try {
            const requests = movieTitles.map(title =>
                fetch(
                    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}`,
                    options
                ).then(res => res.json())
            );
            return await Promise.all(requests);
        } catch (err) {
            console.error("TMDB fetch failed", err);
            return [];
        }
    };

    return fetchTmdbAPI;
};

export default useTmdbMovieSearch;


// Custom hooks:
// don’t return data by default
// they return state, functions, or both

// This returns a function — clean and production ready.