"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

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
 const { setTheme } = useTheme()

  const [genres, setGenres] = useState([]);
  const router = useRouter();

  useEffect (() => {
    const getGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
            },
          },
        );

        const data = await response.json();

        console.log(data);

        setGenres(data.genres);

      } catch (err) {
        console.error(err);

       
      }
    };

    getGenres();
  }, []);

  const handleGenreClick = (id) => {
    router.push(`/genre/${id}`);
  };

  return (
    <div className="flex justify-between p-4 px-4 py-4 w-screen items-center h-[59] mt-[12] mr-[80]">
      <div className=" flex items-center gap-4 ml-[80]">
        <img src="/film.png" />
        <img className="" src="/Movie Z.png" />
      </div>
      <div className="flex px-[330] py-[280] gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            
              <Button variant="outline">
                <img src="/down.png" />
                Genre
              </Button>
              </DropdownMenuTrigger>
             
              
          

          <DropdownMenuContent className="flex items-start w-[577] h-[333] p-4">
            <DropdownMenuGroup>
              <p className="font-semibold">Genres</p>
              <DropdownMenuLabel>
                See lists of movies by genre
              </DropdownMenuLabel>
              <div className="grid grid-cols-5 gap-2 p-4">
                {genres.map((g) => (
                <button key={g.id} onClick={() => handleGenreClick(g.id)}>
                  {g.name} &gt;
                </button>
                ))}
              </div>
              
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <InputGroup className="max-w-xs w-[379] h-[36]">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
