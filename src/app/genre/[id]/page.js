"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { MovieCard } from "@/components/MovieCard";
import { GenreSidebar } from "@/components/GenreSidebar";
import { useGenres } from "@/hooks/useGenres";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const GenrePage = () => {
  const params = useParams();
  const genreId = params.id;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = Number(searchParams.get("page")) || 1;
  const extraIds = searchParams.get("extra")?.split(",").filter(Boolean) || [];

  const { genres } = useGenres();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (!genreId) return;

    const allGenreIds = [genreId, ...extraIds];
    const genreQuery = allGenreIds.join("|");

    const fetchMoviesByGenre = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreQuery}&language=en-US&page=${pageParam}&sort_by=popularity.desc`,
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
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesByGenre();
  }, [genreId, searchParams.toString(), pageParam]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`/genre/${genreId}?${params.toString()}`);
  };

  const genreName =
    genres.find((g) => g.id === Number(genreId))?.name || "Genre";

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-12 flex gap-6">
        <GenreSidebar />

        <div className="flex-1 flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold">{genreName} movies</h1>
            {!isLoading && (
              <p className="text-muted-foreground mt-1">
                {totalResults} results
              </p>
            )}
          </div>

          {isLoading && <div>Loading...</div>}
          {!isLoading && movies.length === 0 && <div>No results found</div>}

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
      </div>
      <Footer />
    </div>
  );
};

export default GenrePage;
