"use client";
import { useState, useEffect } from "react";
import { MovieCard } from "./MovieCard";

const ACCESS_TOKEN =
 "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",

 export const PopularMovies = () => {
 const [movies, setMovies] = useState([]);
 const [isLoading, setIsLoading] = useState(true); 
    useEffect(() => {

        const getMovies = async () =>{
          try { const response = await fetch (
                "https://api.themoviedb.org/3/movie/popular",
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer" + ACCESS_TOKEN,
                    },
                },
            
            );

            const data = await res.json();

    console.log(data.results);
  } catch (err) {
    console.error(err);
    setMovies(data.results.slice(0, 10));
    setIsLoading(false);
  }

    
  getMovies();
        }
 }, []); 

 return (
    <div className="w-full flex flex-col gap-6">
        <div classname="flex justify-between items-center">
        <h1 className="text-2xl">Popular</h1>
        <link href="/movie/popular">See More</link>
     </div>
        {isLoading && <div>Loading...</div>}

        {!isLoading && (

        <div className="grid grid-cols-2 gap-4">
            {movies.map((movie) => {
                return <MovieCard key= {movie.id} {...movie} />
            })}
        </div>
        )}
    </div>
 );
};