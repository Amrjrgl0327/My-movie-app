"use client";
import Image from "next/image";
import Link from "next/link";

export const MovieCard = (props) => {
  return (
    <Link
      href={`/movie/${props.id}`}
      className="flex flex-col w-35px h-110px p-20 mt-14px"
    >
      <div className="w-35px h-110px aspect-3/4 relative rounded-lg shadow overflow-hidden">
        <Image
          alt={props.title}
          fill
          className=" w-[165] h-350 rounded-lg object-cover"
          src={"https://image.tmdb.org/t/p/w500" + props.poster_path}
        />
      </div>
      <div className="w-35px h-25px bg-gray-200">
        <p className="flex gap-1 ml-1 mt-2 ">
          <img src="/star.png" className="w-4 h-4" alt="star" />
          <span>{props.vote_average?.toFixed(1)}</span>
          <span className="text-muted-foreground items-center justify-center">
            {" "}
            /10{" "}
          </span>
        </p>
        <p className="flex items-center ml-2 truncate">{props.title}</p>
      </div>
    </Link>
  );
};
