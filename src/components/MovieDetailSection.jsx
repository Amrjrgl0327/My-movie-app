"use client";
import { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";
import Link from "next/link";

export const MovieDetailSection = ({ movieId }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const getMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          },
        );

        const data = await response.json();

        console.log(data);

        setMovies(data.results?.slice(0, 5) || []);

        setIsLoading(false);
      } catch (err) {
        console.error(err);

        setIsLoading(false);
      }
    };

    getMovies();
  }, [movieId]);

  return (
    <div className="max-w-[1080] mx-auto px-5 mt-10 mb-16 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">More like this</h2>
        <Link href={`/movie/${movieId}/similar`}>
          <img src="/Button (1).png" alt="See more" />
        </Link>
      </div>

      {isLoading && <div>Loading...</div>}

      {!isLoading && (
        <div className="grid grid-cols-5 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} className="w-full" />
          ))}
        </div>
      )}
    </div>
  );
};
