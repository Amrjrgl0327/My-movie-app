"use client";
import { useState, useEffect } from "react";
import { Button } from "@base-ui/react";

export const Header = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState([0]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.ACCESS_TOKEN,
            },
          },
        );

        const data = await response.json();

        console.log(data);

        setMovies(data.results);

        setIsLoading(false);
      } catch (err) {
        console.error(err);

        setIsLoading(false);
      }
    };

    getMovies();
  }, []);

  if (isLoading || movies.length === 0) return null;
  const movie = movies[currentIndex];
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  return (
    <div className="w-screen h-fit relative object-cover">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
      />

      <div className="flex flex-col items-start absolute -translate-10 top-48 mt-[220] ml-[140] mb-[158] gap-4  w-[404]  text-white">
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
          onClick={handleNext}
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
