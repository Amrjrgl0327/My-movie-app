"use client";
import { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";
import Link from "next/link";

export const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.ACCESS_TOKEN,
            },
          },
        );

        const data = await response.json();

        console.log(data);

        setMovies(data.results.slice(0, 10));

        setIsLoading(false);
      } catch (err) {
        console.error(err);

        setIsLoading(false);
      }
    };

    getMovies();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center p-20">
        <h1 className="text-3xl font-bold mt-10px">Upcoming</h1>
        <Link href="/movie/popular">
          <img src="/Button (1).png" />
        </Link>
      </div>
      {isLoading && <div>Loading...</div>}

      {!isLoading && (
        <div className="grid grid-cols-5 gap-4">
          {movies.map((movie) => {
            return <MovieCard key={movie.id} {...movie} />;
          })}
        </div>
      )}
    </div>
  );
};
