"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MovieCard } from "@/components/MovieCard";
import { GenreSidebar } from "@/components/GenreSidebar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("query") || "";
  const pageParam = Number(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setTotalResults(0);
      setTotalPages(1);
      setIsLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${pageParam}`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          },
        );
        const data = await response.json();
        setMovies(data.results?.slice(0, 10) || []);
        setTotalResults(data.total_results || 0);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, pageParam]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    router.push(`/search?query=${encodeURIComponent(query)}&page=${page}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-[1080] mx-auto px-5 py-10 flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-semibold">Search results</h1>
          {!isLoading && (
            <p className="text-muted-foreground mt-1">
              {totalResults} results for &quot;{query}&quot;
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-8">
            {isLoading && <div>Loading...</div>}

            {!isLoading && movies.length === 0 && (
              <div className="flex justify-center items-center border rounded-lg h-24 text-sm">
                No results found.
              </div>
            )}

            {!isLoading && movies.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} {...movie} className="w-full" />
                ))}
              </div>
            )}

            {!isLoading && (
              <div className="flex items-center justify-end gap-3 text-sm">
                <button
                  onClick={() => goToPage(pageParam - 1)}
                  disabled={pageParam <= 1}
                  className="disabled:opacity-40"
                >
                  ‹ Previous
                </button>
                <span className="px-3 py-1 border rounded">{pageParam}</span>
                <button
                  onClick={() => goToPage(pageParam + 1)}
                  disabled={pageParam >= totalPages}
                  className="disabled:opacity-40"
                >
                  Next ›
                </button>
              </div>
            )}
          </div>

          <div className="lg:w-[340] lg:border-l lg:pl-8">
            <GenreSidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="p-5">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
};

export default Page;
