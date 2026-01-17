import React, { useEffect, useState } from "react";
import Header from "./Header";
import { NTFLX_BG, translateLang } from "../utils/constant";
import { useSelector } from "react-redux";

const GptSearch = () => {
  const [placeHolderText, setPlaceHolderText] = useState(
    "Type your movie mood...",
  );
  const langPref = useSelector((state) => state?.appPrefernce.language);
  const transLang = translateLang[langPref];

  useEffect(() => {
    const placeholders = [
      "Looking for a thrilling adventure?",
      "In the mood for a romantic comedy?",
    ];
    let index = 0;
    const intervalId = setInterval(() => {
      setPlaceHolderText(placeholders[index]);
      index = (index + 1) % placeholders.length;
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Header />
      <img src={NTFLX_BG} alt="Background" className="absolute -z-20" />

      <div className="flex flex-col gap-4 items-center !pt-[12%] !z-10">
        <h1 className="text-3xl font-extrabold text-white">
          {transLang?.["Confused? We may help you!"]}
        </h1>

        <div className="flex justify-center items-center gap-4 w-1/2">
          <input
            type="text"
            className="!px-3 !py-2.5 bg-white rounded-md w-full"
            placeholder={transLang?.[placeHolderText]}
          />
          <button
            type="submit"
            className="!px-4 !py-2.5 bg-red-600 text-white rounded-md hover:bg-red-800 hover:cursor-pointer"
          >
            {transLang?.["Search"]}
          </button>
        </div>
      </div>
    </>
  );
};

export default GptSearch;
