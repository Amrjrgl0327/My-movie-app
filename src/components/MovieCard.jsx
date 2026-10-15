"use client";
import Image from "next/image";
import Link from "next/link";

export const MovieCard = ({
  id,
  title,
  poster_path,
  vote_average,
  className = "w-full",
}) => {
  return (
    <Link
      href={`/movie/${id}`}
      className={`flex flex-col rounded-lg overflow-hidden bg-gray-200 dark:bg-zinc-800 ${className}`}
    >
      <div className="relative w-full aspect-2/3">
        <Image
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "/no-poster.png"
          }
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 200px"
          className="object-cover"
        />
      </div>

      <div className="p-2 flex flex-col gap-1">
        <p className="flex items-center gap-1 text-sm">
          <img src="/star.png" className="w-4 h-4" alt="star" />
          <span>{vote_average?.toFixed(1)}</span>
          <span className="text-muted-foreground">/10</span>
        </p>
        <p className="text-sm line-clamp-2">{title}</p>
      </div>
    </Link>
  );
};
