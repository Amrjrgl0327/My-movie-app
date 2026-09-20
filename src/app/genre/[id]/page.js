"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { MovieCard } from "@/components/MovieCard";
import { useGenres } from "@/hooks/useGenres";

const GenrePage = () => {
  const params = useParams();
  const genreId = params.id;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = Number(searchParams.get("page")) || 1;

  const { genres } = useGenres();

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!genreId) return;

    const fetchMoviesByGenre = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=${pageParam}&sort_by=popularity.desc`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          },
        );
        const data = await response.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
        setTotalResults(data.total_results || 0);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [genreId, pageParam]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    router.push(`/genre/${genreId}?page=${page}`);
  };

  const genreName =
    genres.find((g) => g.id === Number(genreId))?.name || "Genre";

  return (
    <div className="container mx-auto py-12 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">{genreName} movies</h1>
        {!isLoading && (
          <p className="text-muted-foreground mt-1">{totalResults} results</p>
        )}
      </div>

      {isLoading && <div>Loading...</div>}

      {!isLoading && movies.length === 0 && <div>Илэрц олдсонгүй.</div>}

      {!isLoading && movies.length > 0 && (
        <div className="grid grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      )}

      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => goToPage(pageParam - 1)}
            disabled={pageParam <= 1}
            className="flex items-center gap-1 disabled:opacity-40"
          >
            ← Previous
          </button>

          <span className="px-3 py-1 border rounded">{pageParam}</span>

          <button
            onClick={() => goToPage(pageParam + 1)}
            disabled={pageParam >= totalPages}
            className="flex items-center gap-1 disabled:opacity-40"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default GenrePage;
