"use client";
import { useState, useEffect } from "react";
import { MovieCard } from "../../../components/MovieCard";

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
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          },
        );

        const data = await response.json();

        console.log(" upcoming data", data.results);

        setMovies(data.results || []);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    getMovies();
  }, [page]);
  console.log("movie", movies);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12 flex flex-col gap-8">
      <h1 className="text-2xl">upcoming</h1>

      <div className="grid grid-cols-5 gap-4">
        {movies.map((movie) => {
          return <MovieCard key={movie.id} {...movie} />;
        })}
      </div>

      <div className="flex gap-3">
        <div onClick={handlePrev} className="cursor-pointer">
          Prev
        </div>
        <div>{page}</div>
        <div onClick={handleNext} className="cursor-pointer">
          Next
        </div>
      </div>
    </div>
  );
};

export default Page;
