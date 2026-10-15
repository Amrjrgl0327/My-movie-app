"use client";
import { useState, useEffect } from "react";
import { MovieCard } from "../../../components/MovieCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          },
        );

        const data = await response.json();

        console.log("topRated data", data);

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
    <div>
      <Navbar />
      <div className="container mx-auto py-12 flex flex-col gap-8">
        <h1 className="text-2xl">Top Rated</h1>

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
      <Footer />
    </div>
  );
};

export default Page;
