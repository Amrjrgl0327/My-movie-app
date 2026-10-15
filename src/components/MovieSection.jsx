"use client";
import Link from "next/link";
import { MovieCard } from "./MovieCard";

const MovieSection = ({ sectionName, movieData = [], href }) => {
  return (
    <section className="max-w-[1280] mx-auto px-5 flex flex-col gap-6 my-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">{sectionName}</h2>
        {href && <Link href={href}>See more →</Link>}
      </div>

      <div className="grid grid-cols-5 gap-8">
        {movieData.map((movie) => (
          <MovieCard key={movie.id} {...movie} className="w-full" />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
