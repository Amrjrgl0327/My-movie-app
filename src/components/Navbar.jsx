"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Image } from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown } from "lucide-react";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SearchMovies } from "./SearchMovies";
import { Toggle } from "@base-ui/react";
import { ModeToggle } from "./ModeToggle";
import { useGenres } from "@/hooks/useGenres";

export const Navbar = () => {
  const { genres } = useGenres();
  const router = useRouter();
  const handleGenreClick = (id) => {
    router.push(`/genre/${id}`);
  };

  useEffect(() => {
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

        setGenres(data.genres || []);
      } catch (err) {
        console.error(err);
      }
    };

    getGenres();
  }, []);

  return (
    <div className="flex justify-between mt-[50] px-20 mb-[24]">
      <img src="/logo (2).png" alt="logo" />

      <div className="flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                className="w-[97] h-[36] px-2 py-4 items-center gap-2"
                variant="outline"
              >
                <ChevronDown className="size-4" />
                Genre
              </Button>
            }
          ></DropdownMenuTrigger>

          <DropdownMenuContent className="flex-col items-start w-[600] h-[333] p-4">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-semibold">
                Genres
              </DropdownMenuLabel>
              <DropdownMenuLabel>
                See lists of movies by genre
              </DropdownMenuLabel>

              <DropdownMenuItem className="grid grid-cols-5 gap-2 p-2">
                {genres?.map((genre) => (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                    className="flex items-center rounded-4xl border gap-2 px-2 py-1 font-bold text-8"
                  >
                    {genre.name} &gt;
                  </button>
                ))}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <SearchMovies />
      </div>

      <ModeToggle />
    </div>
  );
};
