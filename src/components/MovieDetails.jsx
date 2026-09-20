import { formatDate, formatRuntime } from "@/lib/utils";

function MovieDetails({ movie, certification }) {
  return (
    <div className="flex flex-col mt-[50] ml-[180]">
      <h1 className="font-bold text-4xl">{movie.title}</h1>
      <div>
        {formatDate(movie.release_date)}
        {certification}
        {formatRuntime(movie.runtime)}
      </div>

      <div className="flex gap-2 mt-2">
        {movie.genres?.map((g) => (
          <span key={g.id} className="border rounded-full px-3 py-1 text-sm">
            {g.name}
          </span>
        ))}
      </div>
      <p className="mt-4">{movie.overview}</p>
    </div>
  );
}

export default MovieDetails;
