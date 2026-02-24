import { options } from "../utils/Constant";

const useTrailerPlayAPI = (movieIdx = "") => {

    const trailerAPI = async () => {
        if (!movieIdx) return;
        const controller = new AbortController();
        try {
            const data = await fetch(`https://api.themoviedb.org/3/movie/${movieIdx}/videos`,
                { ...options, signal: controller.signal }
            );
            const json = await data.json();
            const trailerData = json?.results?.filter(
                (item) =>
                    item.type === "Trailer" &&
                    item.site === "YouTube" &&
                    item.official === true
            );

            const trailerDataKey = trailerData.length > 0 ?
                trailerData[0]?.key : json?.results[0]?.key;

            return trailerDataKey;
        } catch (error) {
            if (error.name !== "AbortError") throw new Error(error.message);
        }
        finally {
            controller.abort();
        }
    };

    return trailerAPI;
}

export default useTrailerPlayAPI;
