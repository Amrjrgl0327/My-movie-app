"use client";

import { useRouter } from "next/navigation";

export const MovieCard = ({ imgSrc, rating, title, id }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/movie/${id}`)}
      className="flex flex-col flex-wrap w-[230] h-[439] bg-gray-200"
    >
      <img src={imgSrc} alt="movie Image" width={230} height={340} />

      <p className="flex gap-1 ml-1 mt-2">
        <img src="/star.png" />
        {rating}{" "}
        <span className="text-muted-foreground items-center justify-center">
          /10
        </span>
      </p>

      <p className="flex items-center ml-2">{title}</p>
    </div>
  );
};
