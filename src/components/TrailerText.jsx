import React from "react";
import { useSelector } from "react-redux";
import { translator } from "../utils/Helper";
import { useNavigate } from "react-router-dom";

const TrailerText = () => {
  const navigate = useNavigate();
  const movieData = useSelector((state) => state?.movie?.movieForTrailer);
  const langPref = useSelector((state) => state?.appPrefernce.language);

  return (
    <div className="flex flex-col gap-4 px-16 absolute z-50 bottom-1/6">
      <h1 className="md:text-4xl sm:text-xl font-bold text-white">{movieData?.title}</h1>
      <div className="min-h-1/6 md:block hidden">
        <p className="w-1/2 text-white !font-light text-wrap text-sm">{movieData?.overview}</p>
      </div>
      <div className="w-1/2">
        <button className="cursor-pointer bg-gray-500 opacity-60 hover:opacity-90 bg-blend-color text-black rounded-sm !px-4 !py-1 font-semibold transition"
          onClick={() => navigate(`/movie/${movieData?.title}/${movieData?.id}`)}>
          {translator(langPref, "More Info")}
        </button>
      </div>
    </div>
  );
};

export default TrailerText;
