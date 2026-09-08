"use client";

import { Button } from "@base-ui/react";

export const Header = ({ movie, onNext }) => {
  return (
    <div className="w-screen h-fit relative object-cover">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
      />

      <div className="flex flex-col items-start absolute -translate-10 top-48 mt-[178] ml-[140] mb-[158] gap-4  w-[404]  text-white">
        <p className="font-[Inter] text-[16] font-normal">Now Playing:</p>
        <h1 className="font-[Inter] text-[36px] font-bold">{movie.title}</h1>
        <p className="flex gap-1 ml-1 mt-2">
          <img src="/star.png" />

          <p>{movie.vote_average.toFixed(1)} / 10</p>
        </p>
        <p className="font-[Inter] text-[12] font-normal">{movie.overview}</p>
        <img className="w-[145] h-[40] rounded-md mb-[120]" src="/button.png" />
      </div>
      <div>
        <Button
          onClick={onNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 "
        >
          <img
            className="rounded-full bg-white w-[40] h-[40]"
            src="/Right.png"
          />
        </Button>
      </div>
    </div>
  );
};
