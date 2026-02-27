import React from "react";
import Shimmer from "./Shimmer";
import { translator } from './../utils/Helper';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MovieBrowseCard = ({ movie, title, showName = false, loading = true, error = null }) => {
  const langPref = useSelector((state) => state?.appPrefernce.language);

  return (
    <div className="!px-12">
      <h1 className="text-2xl font-bold !pb-1.5 text-yellow-500">{showName && <span>{translator(langPref, "Search Results")}</span>}{title}{showName && <span>"</span>}</h1>
      <div className="flex gap-4 overflow-x-scroll hide-scrollbar min-h-[200px] items-center">
        {/* section wise API error handling */}
        {loading ?
          <Shimmer /> :
          (!loading && error) ? (
            <div className="w-full flex items-center justify-center">
              <p className="text-gray-400 text-sm">
                Unable to load this section.
              </p>
            </div>
          ) : (
            movie && movie.map((ele) => (
              <Link to={`/movie/${ele.title}/${ele.id}`} key={ele.id}>
                <div className="min-w-[150px] h-[200px] bg-gray-700 rounded-md flex-shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
                    alt={ele.title}
                    className="w-full h-full !object-cover rounded-md"
                  />
                </div>
              </Link>
            ))
          )}
      </div>
    </div>
  );
};

export default MovieBrowseCard;

// if loading --> show shimmer
// if no loading and error --> show Error "Unable to load this section"
// if no loading and no error --> show data
