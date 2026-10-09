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
        setIsLoading(false);
      } catch (err) {
        console.error(err);
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
    <div>
      <Navbar />
      <div className="container mx-auto flex flex-col gap-25">
        <div>
          <h1 className="text-2xl font-bold">Search results</h1>
          {!isLoading && (
            <p className="text-muted-foreground mt-1">
              {totalResults} results for &quot;{query}&quot;
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            {isLoading && <div>Loading...</div>}

            {!isLoading && movies.length === 0 && (
              <div className="flex justify-center items-center border-2 rounded-l-lg w-[804] h-[95]">
                Not results found
              </div>
            )}

            {!isLoading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => goToPage(pageParam - 1)}
                  disabled={pageParam <= 1}
                  className="flex items-center gap-1 disabled:opacity-40"
                >
                  ‹ Previous
                </button>

                <span className="px-3 py-1 border rounded">{pageParam}</span>

                <button
                  onClick={() => goToPage(pageParam + 1)}
                  disabled={pageParam >= totalPages}
                  className="flex items-center gap-1 disabled:opacity-40"
                >
                  Next ›
                </button>
              </div>
            )}

            {!isLoading && movies.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  ‹ Previous
                </button>

                <span className="px-3 py-1 border rounded">{pageParam}</span>

                <button
                  onClick={() => goToPage(pageParam + 1)}
                  disabled={pageParam >= totalPages}
                  className="flex items-center gap-1 disabled:opacity-40"
                >
                  Next ›
                </button>
              </div>
            )}
          </div>

          <GenreSidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="p-20">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
};

export default Page;
