import React from "react";
import { useSelector } from "react-redux";
import { translator } from "../utils/Helper";
import { useNavigate } from "react-router-dom";
import ShimmerBlock from "./ShimmerBlock";
import { IoInformationCircle } from "react-icons/io5";

const TrailerText = ({ loading }) => {
  const navigate = useNavigate();
  const movieData = useSelector((state) => state?.movie?.movieForTrailer);
  const langPref = useSelector((state) => state?.appPrefernce.language);

  return (
    <div className="flex flex-col gap-4 px-16 absolute z-50 bottom-1/6">
      {loading ?
        <>
          <ShimmerBlock className="h-10 w-[200px] pb-6" />
          <div className="space-y-2">
            <ShimmerBlock className="h-6 w-[500px]" />
            <ShimmerBlock className="h-6 w-[450px]" />
            <ShimmerBlock className="h-6 w-[350px]" />
          </div>
        </> : <>
          <h1 className="md:text-4xl sm:text-xl font-bold text-yellow-500">{movieData?.title}</h1>
          <div className="min-h-1/6 md:block hidden">
            <p className="w-1/2 text-zinc-200 text-wrap text-sm font-medium">{movieData?.overview}</p>
          </div>
          <div className="w-1/2">
            <button className="cursor-pointer bg-yellow-200 opacity-60 hover:opacity-90 bg-blend-color text-black rounded-sm !px-4 !py-1 font-semibold whitespace-nowrap text-nowrap"
              onClick={() => navigate(`/movie/${movieData?.title}/${movieData?.id}`)}>
              <span className="flex items-center justify-center gap-1">
                <IoInformationCircle />
                {translator(langPref, "More Info")}
              </span>
            </button>
          </div>
        </>}

    </div>
  );
};

export default TrailerText;
