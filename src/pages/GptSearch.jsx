import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetState, setSearchTitleList, setTmdbMovieList } from "../utils/store/gptSlice";
import ai from "../utils/API/geminiAPI";
import useGeminiMovieSearch from "../hooks/useGeminiMovieSearch";
import { useLocation } from "react-router-dom";
import MovieBrowseCard from "../components/MovieBrowseCard";
import Background from "../components/Background";
import { toast } from "react-toastify";
import { translator } from "../utils/Helper";

const GptSearch = () => {
  const searchText = useRef(null);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [placeHolderText, setPlaceHolderText] = useState(
    "Type your movie mood...",
  );
  const langPref = useSelector((state) => state?.appPrefernce.language);
  const dispatch = useDispatch();
  const gptMovie = useSelector((state) => state?.gpt?.gptList);
  const searchMovieListResult = useSelector((state) => state?.gpt?.searchMovieList);
  const fetchTmdbAPI = useGeminiMovieSearch();

  // call gemini API to get movie suggestions based on user input
  const OnSearchMovie = async (event) => {
    event.preventDefault();
    const query = searchText.current?.value?.trim();
    if (!query) return;
    // gemini API call for movie search
    try {
      setLoading(true);
      const SearchMovie = async () => {
        const searchQUeryText =
          "Find me some movies related to the following description and you must act as movie expert: " +
          query +
          ". Provide the movie titles only in a comma seprated. Must include only the titles. Number of titles should be at most 10. Don't include any other text. Must be in English. Not send any other explanation and unnescessary text. And language must be in English.";
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-lite",
          contents: searchQUeryText,
        });
        const titles =
          response?.candidates?.[0]?.content?.parts?.[0]?.text
            ?.split(",")
            .map(t => t.trim())
            .filter(Boolean) || [];

        dispatch(setSearchTitleList(titles));
      };
      await SearchMovie();
    } catch {
      toast.error("Failed to fetch movie suggestions. Please try again.");
      setLoading(false);
    }
  };

  // fetch tmdb movie details when gptMovie state get updated
  useEffect(() => {
    // after fetching the data call tmdb API to get movie details
    const call = async () => {
      if (!gptMovie || gptMovie.length === 0) {
        setLoading(false);
        return;
      }
      const results = await fetchTmdbAPI(gptMovie);
      const normalize = str =>
        str.toLowerCase().replace(/[^a-z0-9]/g, "");

      const cleanedData = results.map((res, index) => {
        const movies = res?.results ?? [];
        const searchTitle = normalize(gptMovie[index]);

        const englishMovies = movies.filter(m => m.original_language === "en");

        const scoredMovies = englishMovies.map(movie => {
          const titleScore = normalize(movie.title) === searchTitle ? 100 : 0;

          return {
            ...movie,
            score: titleScore + movie.popularity + movie.vote_count / 10,
          };
        });

        scoredMovies.sort((a, b) => b.score - a.score);

        return scoredMovies[0];
      }).filter(Boolean);
      setLoading(false);
      dispatch(setTmdbMovieList(cleanedData));
    };
    call();
  }, [gptMovie]);

  // clean up on page change
  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [location.pathname, dispatch]);

  // this to show dynamic placeholder text
  useEffect(() => {
    const placeholders = [
      "Looking for a thrilling adventure?",
      "In the mood for a romantic comedy?",
    ];
    let index = 0;
    const intervalId = setInterval(() => {
      setPlaceHolderText(placeholders[index]);
      index = (index + 1) % placeholders.length;
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative min-h-screen w-full">

      {/* Background */}
      <Background />

      <div className="flex flex-col gap-4 items-center justify-center mt-32 absolute w-full">
        <h1 className="text-3xl font-extrabold text-white">
          {translator(langPref, "Confused? We may help you!")}
        </h1>


        {/* Movie Recommendation search */}
        <form className="flex justify-center items-center gap-4 w-1/2 bg-black !px-4 !py-3 rounded-xs" onSubmit={OnSearchMovie}>
          <input
            type="text"
            className="!px-3 !py-2.5 bg-white rounded-md w-10/12"
            placeholder={translator(langPref, placeHolderText)}
            ref={searchText}
            disabled={loading}
          />

          {/* button for search */}
          <button
            type="submit"
            className={`px-4 py-2.5 rounded-md w-2/12 text-white ${loading
              ? "bg-red-600/80 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-800 cursor-pointer"
              }`}
            disabled={loading}
          >
            {loading ? translator(langPref, "Searching") : translator(langPref, "Search")}
          </button>
        </form>


        {/* Searched Movies */}
        {searchMovieListResult && searchMovieListResult.length > 0 && (
          <div className="!mt-14 w-full">
            <MovieBrowseCard movie={searchMovieListResult} title={searchText.current?.value} showName={true} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GptSearch;
