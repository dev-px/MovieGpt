import React from "react";
import Shimmer from "./Shimmer";
import { translator } from './../utils/Helper';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MovieBrowseCard = ({ movie, title, showName = false, loading = true }) => {
  const langPref = useSelector((state) => state?.appPrefernce.language);

  return (
    <div className="!px-12">
      <h1 className="text-2xl font-bold !pb-1.5 text-white">{showName && <span>{translator(langPref, "Search Results")}:</span>}{title}{showName && <span>"</span>}</h1>
      <div className="flex gap-4 overflow-x-scroll hide-scrollbar">
        {loading ? <Shimmer />
          : (
            movie && movie.map((ele) => (
              <Link to={`/movie/${ele.title}/${ele.id}`} key={ele.id}>
                <div className="min-w-[150px] h-[200px] bg-gray-700 rounded-md flex-shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
                    alt={ele.title}
                    className="w-full h-full !object-cover rounded-md"
                  />
                </div>
                {showName && (
                  <p className="text-white font-semibold capitalize text-center !mt-2 !px-2 text-lg">
                    {ele?.title}
                  </p>
                )}
              </Link>
            ))
          )}
      </div>
    </div>
  );
};

export default MovieBrowseCard;
