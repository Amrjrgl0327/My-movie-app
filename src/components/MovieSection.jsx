"use client";
import React from "react";
import { MovieCard } from "./MovieCard";

const MovieSection = ({ sectionName, movieData }) => {
  return (
    <div className="w-screen px-[80]">
      <div className="flex w-full justify-between">
        <p>{sectionName}</p>
        <img className="w-[74] h-[30] gap-1" src="/Button(1).png" />
      </div>
      <div className="flex gap-8 flex-wrap">
        {movieData.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              imgSrc={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              rating={Math.floor(movie.vote_average)}
              title={movie.original_title}
              id={movie.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieSection;
