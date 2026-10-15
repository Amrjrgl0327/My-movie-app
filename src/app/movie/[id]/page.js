"use client";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { MovieDetailSection } from "@/components/MovieDetailSection";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const BASE_URL = "https://api.themoviedb.org/3/movie";
const headers = {
  Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
};

const formatRuntime = (min) =>
  min ? `${Math.floor(min / 60)}h ${min % 60}m` : "";

const formatVotes = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n ?? 0}`;

const InfoRow = ({ label, names }) => (
  <div className="flex gap-4 py-3 border-b">
    <h3 className="font-semibold w-24 shrink-0">{label}</h3>
    <p>{names.join(" · ")}</p>
  </div>
);

const Page = () => {
  const params = useParams();
  const movieId = params.id;

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [certification, setCertification] = useState("NR");
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetail = async () => {
      try {
        const [certRes, detailRes, creditsRes] = await Promise.all([
          fetch(`${BASE_URL}/${movieId}/release_dates`, { headers }),
          fetch(`${BASE_URL}/${movieId}?language=en-US`, { headers }),
          fetch(`${BASE_URL}/${movieId}/credits?language=en-US`, { headers }),
        ]);

        const certData = await certRes.json();
        const detailsData = await detailRes.json();
        const creditsData = await creditsRes.json();

        const usRelease = certData?.results?.find((r) => r.iso_3166_1 === "US");
        const cert =
          usRelease?.release_dates?.find((d) => d.certification)
            ?.certification || "NR";

        setCertification(cert);
        setMovie(detailsData);
        setCredits(creditsData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  const handleWatchTrailer = async () => {
    try {
      const res = await fetch(`${BASE_URL}/${movieId}/videos?language=en-US`, {
        headers,
      });
      const data = await res.json();

      const trailer =
        data.results?.find(
          (v) => v.site === "YouTube" && v.type === "Trailer",
        ) || data.results?.find((v) => v.site === "YouTube");

      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("Trailer олдсонгүй");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading || !movie) return <div>Loading...</div>;

  const directors =
    credits?.crew?.filter((c) => c.job === "Director").map((c) => c.name) || [];
  const writers =
    credits?.crew
      ?.filter((c) => c.job === "Writer" || c.job === "Screenplay")
      .map((c) => c.name) || [];
  const stars = credits?.cast?.slice(0, 5).map((c) => c.name) || [];

  return (
    <div>
      <Navbar />

      <div className="max-w-[1080] mx-auto px-5 flex flex-col gap-6 mt-10">
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-lg">
              {movie.release_date?.replaceAll("-", ".")} · {certification} ·{" "}
              {formatRuntime(movie.runtime)}
            </p>
          </div>
          <div className="flex flex-col items-center text-xs">
            <span>Rating</span>
            <div className="flex items-center gap-1">
              <img src="/star.png" className="w-6 h-6" alt="star" />
              <span className="text-lg">
                <b>{movie.vote_average?.toFixed(1) ?? "N/A"}</b>/10
              </span>
            </div>
            <span className="text-gray-500">
              {formatVotes(movie.vote_count)}
            </span>
          </div>
        </div>

        <div className="flex gap-8">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-poster.png"
            }
            className="w-[290] h-[428] object-cover rounded"
            alt={movie.title}
          />
          <div className="relative flex-1 h-[428]">
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : "/no-backdrop.png"
              }
              className="w-full h-full object-cover rounded"
              alt={movie.title}
            />
            <button
              onClick={handleWatchTrailer}
              className="absolute bottom-6 left-6 flex items-center gap-3 text-white cursor-pointer"
            >
              <span className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                ▶
              </span>
              Play trailer
            </button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {movie.genres?.map((g) => (
            <span
              key={g.id}
              className="border rounded-full px-3 py-1 text-xs font-semibold"
            >
              {g.name}
            </span>
          ))}
        </div>
        <p>{movie.overview}</p>

        {credits && (
          <div className="flex flex-col">
            <InfoRow label="Director" names={directors} />
            <InfoRow label="Writers" names={writers} />
            <InfoRow label="Stars" names={stars} />
          </div>
        )}
      </div>

      <MovieDetailSection movieId={movieId} />
      <Footer />

      {trailerKey && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setTrailerKey(null)}
        >
          <div
            className="relative w-[80vw] max-w-[900] aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setTrailerKey(null)}
              className="absolute -top-10 right-0 text-white text-2xl cursor-pointer"
            >
              ✕
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
