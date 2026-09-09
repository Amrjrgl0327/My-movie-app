"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MovieCard } from "@/components/MovieCard";

const GenrePage = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

   

  useEffect (() => {
    const getMoviesByGenre = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=${page}",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          },
        );

        const data = await response.json();

        console.log(data);

        setMovies(data.results);

      } catch (err) {
        console.error(err);
     } finally {
        setIsLoading(false);
     }
    };

    getMoviesByGenre();
  }, [id]);

  if(isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-5 gap-4 p-8">
        {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
        ))}
    </div>
  );
  };


  export default GenrePage;