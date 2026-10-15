"use client";
import { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";
import Link from "next/link";
console.log("helo popular");
export const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/popular",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          },
        );

        const data = await response.json();

        setMovies(data.results?.slice(0, 10) || []);

        setIsLoading(false);
      } catch (err) {
        console.error(err);

        setIsLoading(false);
      }
    };

    getMovies();
  }, []);
  console.log("movie", movies);

  return (
    <section className="max-w-[1280] mx-auto px-5 flex flex-col gap-6 my-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Popular</h2>
        <Link href="/movie/popular">
          <img src="/Button (1).png" alt="See more" />
        </Link>
      </div>

      {isLoading && <div>Loading...</div>}

      {!isLoading && (
        <div className="grid grid-cols-5 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} className="w-full" />
          ))}
        </div>
      )}
    </section>
  );
};
