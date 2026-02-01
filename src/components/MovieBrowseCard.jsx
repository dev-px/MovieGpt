import React from "react";

const MovieBrowseCard = ({ movie, title, showName = false }) => {
  return (
    <div className="!px-12">
      <h1 className="text-2xl font-bold !pb-1.5 text-white">{showName && <span>Search Result: "</span>}{title}{showName && <span>"</span>}</h1>
      <div className="flex gap-4 overflow-x-scroll hide-scrollbar">
        {movie && movie.map((ele) => (
          <div key={ele.id} className="flex flex-col items-center">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieBrowseCard;
