"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export const SearchMovies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setMovies([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      const searchMovies = async () => {
        try {
          setIsLoading(true);

          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&language=en-US&page=1`,
            {
              method: "GET",
              headers: {
                Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
              },
            },
          );

          const data = await response.json();

          setMovies(data.results?.slice(0, 5) || []);
          setIsOpen(true);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          setIsLoading(false);
        }
      };

      searchMovies();
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSeeAll = () => {
    router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <InputGroup className="flex items-center w-[379] h-[36] gap-2.5 rounded-lg border px-3">
        <InputGroupInput
          id="inline-start-input"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery && setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && searchQuery.trim()) {
              handleSeeAll();
            }
          }}
        />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>

      {isOpen && (
        <div className="absolute top-full mt-2 w-[500] bg-white shadow-xl rounded-lg z-50 overflow-hidden border">
          {isLoading && <p className="p-4 text-sm">Search...</p>}

          {!isLoading && movies.length === 0 && (
            <p className="p-4 text-sm">Not Found.</p>
          )}

          {!isLoading &&
            movies.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center gap-3 p-3 border-b last:border-none hover:bg-gray-50"
              >
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{movie.title}</p>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <span>⭐</span>
                    <span>{movie.vote_average?.toFixed(1)}/10</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {movie.release_date?.slice(0, 4)}
                  </p>
                </div>
                <Link
                  href={`/movie`}
                  className="text-sm text-blue-600 whitespace-nowrap flex items-center gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  See more →
                </Link>
              </div>
            ))}

          {!isLoading && movies.length > 0 && (
            <button
              onClick={handleSeeAll}
              className="w-full text-center text-sm py-3 hover:bg-gray-50 border-t"
            >
              See all results for &quot;{searchQuery}&quot; →
            </button>
          )}
        </div>
      )}
    </div>
  );
};
