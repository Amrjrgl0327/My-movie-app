"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { Navbar } from "@/components/Navbar";

const Page = () => {
  const params = useParams();
  const movieId = params.id;

  const [similar, setSimilar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchSimilar = async () => {
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

        if (!response.ok) {
          throw new Error("Алдаа: " + response.status);
        }

        const data = await response.json();

        setSimilar(data.results.slice(0, 10));
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilar();
  }, [movieId]);

  return (
    <div>
      <Navbar />

      <div className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center p-20">
          <h1 className="text-3xl font-bold mt-[10]">More like this</h1>
          <Link href={`/movie/${movieId}`}>
            <img src="/Button (1).png" alt="Back" />
          </Link>
        </div>

        {isLoading && <div className="px-20">Loading...</div>}

        {error && <div className="px-20 text-red-500">{error}</div>}

        {!isLoading && !error && (
          <div className="grid grid-cols-5 gap-4 px-20">
            {similar.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Page;
