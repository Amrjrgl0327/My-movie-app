"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-tv",
  "Romance",
  "Sci-Fi",
  "Short",
  "Sport",
  "Talk-Show",
  "Thriller",
  "Western",
];

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

          <DropdownMenuContent className="flex items-start w-[577] h-[333] p-4">
            <DropdownMenuGroup>
              <DropdownMenu>Genres</DropdownMenu>
              <DropdownMenuLabel>
                See lists of movies by genre
              </DropdownMenuLabel>
              <div className="grid grid-cols-5 px-4 py-3 gap-5">
                {genres.map((genre) => {
                  return (
                    <Badge
                      key={genre}
                      variant="outline"
                      className="flex cursor-pointer items-center gap-1 font-bold"
                    >
                      {genre}
                      <ArrowRight className="h-3 w-3" />
                    </Badge>
                  );
                })}
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <InputGroup className="max-w-xs">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <div>
          <img src="/Modes.png" />
        </div>
      </div>
    </div>
  );
};
