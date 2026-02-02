import React from "react";
import { useSelector } from "react-redux";
import { translateLang } from "../utils/Constant";

const TrailerText = () => {
  const movieText = useSelector((state) => state?.movie?.movieForTrailer);
  const langPref = useSelector((state) => state?.appPrefernce.language);
  return (
    <div className="flex flex-col gap-4 !justify-end !py-[12%] !px-16">
      <h1 className="text-4xl font-bold text-white">{movieText?.title}</h1>
      <p className="w-1/2 text-white !font-light">{movieText?.overview}</p>
      <div className="flex gap-6 !mt-5">
        <button className="cursor-pointer bg-white text-black rounded-sm !px-6 !py-1.5 font-semibold hover:opacity-70 transition">
          {translateLang[langPref]?.["Play"]}
        </button>
        <button className="cursor-pointer bg-gray-500 opacity-60 hover:opacity-90 bg-blend-color text-black rounded-sm !px-6 !py-1.5 font-semibold transition">
          {translateLang[langPref]?.["More Info"]}
        </button>
      </div>
    </div>
  );
};

export default TrailerText;
