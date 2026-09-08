"use client";
import Image from "next/image";

import { useRouter } from "next/navigation";

export const MovieCard = (props) => {
  return (
    <div className="w-full aspect-3/4 relative rounded-lg shadow overflow-hidden">
      <Image
        alt={props.title}
        fill
        src={"https://image.tmdb.org/t/p/original" + props.poster_path}
      />
    </div>
  );
};
