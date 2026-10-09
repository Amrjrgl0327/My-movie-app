"use client";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { Navbar } from "@/components/Navbar";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import MovieDetails from "@/components/MovieDetails";

import { MovieDetailSection } from "@/components/MovieDetailSection";
const Page = () => {
  const params = useParams();
  const movieId = params.id;

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [certification, setCertification] = useState("NR");

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetail = async () => {
      try {
        const certRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/release_dates?language=en-US`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          },
        );

        const detailResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          },
        );

        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          },
        );

        const similarResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          },
        );

        const detailsData = await detailResponse.json();
        const creditsData = await creditsResponse.json();
        const similarData = await similarResponse.json();

        setMovie(detailsData);
        console.log("detailsData", detailsData);
        setCredits(creditsData);
        setSimilar(similarData);
        setIsLoading(false);

        // const certData = await certRes.json();
        // const usRelease = certData?.results?.find((r) => r.iso_3166_1 === `US`);
        // const cert = usRelease?.release_dates[0]?.certification || `NR`;
        // setCertification(cert);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (isLoading || !movie) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <MovieDetails movie={movie} certification={certification} />
      <div className="flex justify-end  gap-1 mr-[180]">
        <h1>Rating</h1>
        <img src="/star.png" className="w-4 h-4" alt="star" />
        {movie?.vote_average?.toFixed(1) ?? "N/A"} / 10
      </div>

      <div className=" flex flex-col gap-8 ">
        <div className="flex gap-8 p-45">
          <img
            src={
              movie?.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : "/no-poster.png"
            }
            alt={movie?.title}
            className="h-[560] w-[320] object-cover rounded-lg"
          />
          <img
            src={
              movie?.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : "/no-backdrop.png"
            }
            alt={movie?.title}
            className="w-[760] h-[560] flex-1 object-cover rounded-lg"
          />
        </div>

        {credits?.crew && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <h3 className="font-bold w-24">Director</h3>
              <p>
                {" "}
                {credits.crew
                  .filter((c) => c.job === "Director")
                  .map((c) => c.name)
                  .join(", ")}{" "}
              </p>
            </div>
            <div className="flex gap-4">
              <h3 className="font-bold w-24">Writers</h3>
              <p>
                {" "}
                {credits.crew
                  .filter((c) => c.job === "Writer" || c.job === "Screenplay")
                  .map((c) => c.name)
                  .join(", ")}{" "}
              </p>
            </div>
            <div className="flex gap-4">
              <h3 className="font-bold w-24">Stars</h3>
              <p>
                {" "}
                {credits.cast
                  ?.slice(0, 5)
                  .map((c) => c.name)
                  .join(", ")}{" "}
              </p>
            </div>
          </div>
        )}
      </div>
      <MovieDetailSection movie={movie} movieId={movieId} />
      <Footer />
    </div>
  );
};
export default Page;
