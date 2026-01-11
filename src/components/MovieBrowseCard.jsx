import React from "react";

const MovieBrowseCard = ({ movie, title }) => {
  return (
    <div className="!px-12">
      <h1 className="text-xl font-semibold !pb-1.5">{title}</h1>
      <div className="flex gap-4 overflow-x-scroll hide-scrollbar">
        {movie &&
          movie.map((ele) => (
            <div
              key={ele.id}
              className="min-w-[150px] h-[200px] bg-gray-700 rounded-md flex-shrink-0"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${ele.poster_path}`}
                alt={ele.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieBrowseCard;
