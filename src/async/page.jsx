const fetchUserDataAsync = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typecode.com/user/1");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
};
("use client");
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export const Navigation = () => {
  return (
    <div className="flex justify-between p-4 px-4 py-4 w-screen items-center h-[59] mt-[12] mr-[80]">
      <div className=" flex items-center gap-4 ml-[80]">
        <img src="/film.png" />
        <img className="" src="/Movie Z.png" />
      </div>
      <div className="flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline">
                <img src="/down.png" />
                Genre
              </Button>
            }
          />

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenu>Genres</DropdownMenu>
              <DropdownMenuLabel>
                See lists of movies by genre
              </DropdownMenuLabel>
              <div className="w-screen grid-cols-5 gap-2">
                <DropdownMenuItem> Action&gt;</DropdownMenuItem>
                <DropdownMenuItem>Adventure &gt;</DropdownMenuItem>
                <DropdownMenuItem>Animation &gt;</DropdownMenuItem>
                <DropdownMenuItem>ActionBiography &gt;</DropdownMenuItem>
                <DropdownMenuItem>Comedy &gt;</DropdownMenuItem>
                <DropdownMenuItem>Crime &gt;</DropdownMenuItem>
                <DropdownMenuItem>Documentary &gt;</DropdownMenuItem>
                <DropdownMenuItem>Drama &gt;</DropdownMenuItem>
                <DropdownMenuItem>Family &gt;</DropdownMenuItem>
                <DropdownMenuItem>Fantasy &gt;</DropdownMenuItem>
                <DropdownMenuItem>Film-Noir &gt;</DropdownMenuItem>
                <DropdownMenuItem>Game-Show &gt;</DropdownMenuItem>
                <DropdownMenuItem>History &gt;</DropdownMenuItem>
                <DropdownMenuItem>Horror &gt;</DropdownMenuItem>
                <DropdownMenuItem>Music &gt;</DropdownMenuItem>
                <DropdownMenuItem>Musical &gt;</DropdownMenuItem>
                <DropdownMenuItem>Mystery &gt;</DropdownMenuItem>
                <DropdownMenuItem>News &gt;</DropdownMenuItem>
                <DropdownMenuItem>Reality-tv &gt;</DropdownMenuItem>
                <DropdownMenuItem>Romance &gt;</DropdownMenuItem>
                <DropdownMenuItem>Sci-Fi &gt;</DropdownMenuItem>
                <DropdownMenuItem>Short &gt;</DropdownMenuItem>
                <DropdownMenuItem>Sport &gt;</DropdownMenuItem>
                <DropdownMenuItem>Talk-Show &gt;</DropdownMenuItem>
                <DropdownMenuItem>Thriller &gt;</DropdownMenuItem>
                <DropdownMenuItem>War &gt;</DropdownMenuItem>
                <DropdownMenuItem>Western &gt;</DropdownMenuItem>
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex">
          <Input
            className="w-[379] h-[36]"
            img
            src="/glass.png"
            alt="glass.icon"
            placeholder="Search.."
          />
        </div>
      </div>

      <img src="/Modes.png" />
    </div>
  );
};

// Header.js
("use client");

import { Button } from "@base-ui/react";

export const Header = ({ movie, onNext }) => {
  return (
    <div className="w-screen h-fit relative object-cover">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
      />

      <div className="flex flex-col items-start absolute -translate-10 top-48 mt-[178] ml-[140] mb-[158] gap-4  w-[404]  text-white">
        <p className="font-[Inter] text-[16] font-normal">Now Playing:</p>
        <h1 className="font-[Inter] text-[36px] font-bold">{movie.title}</h1>
        <p className="flex gap-1 ml-1 mt-2">
          <img src="/star.png" />

          <p>{movie.vote_average.toFixed(1)} / 10</p>
        </p>
        <p className="font-[Inter] text-[12] font-normal">{movie.overview}</p>
        <img className="w-[145] h-[40] rounded-md mb-[120]" src="/button.png" />
      </div>
      <div>
        <Button
          onClick={onNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 "
        >
          <img
            className="rounded-full bg-white w-[40] h-[40]"
            src="/Right.png"
          />
        </Button>
      </div>
    </div>
  );
};
