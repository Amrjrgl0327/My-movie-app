"use client";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useGenres } from "@/hooks/useGenres";

export const GenreSidebar = () => {
  const { genres, isLoading } = useGenres();
  const router = useRouter();

  const handleGenreClick = (id) => {
    router.push(`/genre/${id}`);
  };

  return (
    <div className="w-full lg:w-[420] shrink-0 mr-[80]">
      <h2 className="text-xl font-bold">Search by genre</h2>
      <p className="text-sm text-muted-foreground mt-1 mb-4">
        See lists of movies by genre
      </p>

      {isLoading && <p className="text-sm">Loading...</p>}

      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className="flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm hover:bg-gray-100 transition"
          >
            {genre.name}
            <ChevronRight className="size-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
};
