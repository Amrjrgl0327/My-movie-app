"use client";
import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard";

const Page = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const handlePrev = () => {
    if (page === 1) return;
    setPage(page - 1);
  };
  const handleNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?page=${page}&lang=en-US`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer" + process.env.ACCESS_TOKEN,
            },
          },
        );

        const data = await res.json();

        console.log(data.results);
      } catch (err) {
        console.error(err);
        setMovies(data.results);
        setIsLoading(false);
      }

      getMovies();
    };
  }, [page]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12 flex flex-col gap-8">
      <h1 className="text-2xl">Popular</h1>

      <div className="grid grid-cols-5 gap-4">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} {...movie} />;
        })}
      </div>
      <div className="flex gap-3">
        <div onClick={handlePrev}>Prev</div>
        <div>{page}</div>
        <div onClick={handleNext}>Next</div>
      </div>
    </div>
  );
};
export default Page;
