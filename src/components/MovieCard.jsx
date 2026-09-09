"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";

export const MovieCard = (props) => {
  return (
    <div className="flex flex-col w-35px h-110px p-20 mt-14px">
      <div className="w-35px h-110px aspect-3/4 relative rounded-lg shadow overflow-hidden">
        <Image
          alt={props.title}
          fill
          className="object-cover"
          src={"https://image.tmdb.org/t/p/original" + props.poster_path}
        />
      </div>
      <div className="w-35px h-25px bg-gray-200">
        <p className="flex gap-1 ml-1 mt-2 ">
          <img src="/star.png" className="w-4 h-4" alt="star" />
          <span>{props.vote_average?.toFixed(1)}</span>

          <span className="text-muted-foreground items-center justify-center">
            /10
          </span>
        </p>
        <p className="flex items-center ml-2 truncate">{props.title}</p>
      </div>
    </div>
  );
};
