"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {Image} from "next/image"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SearchIcon, ChevronDown } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";




export const Navbar = () => {

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
       <div className="flex justify-between mt-[50] px-20">
        <img src="/logo.png" alt="logo" />
        
        <div className="flex gap-3"> <DropdownMenu>
              <DropdownMenuTrigger render={<Button className="w-[97] h-[36] px-2 py-4 items-center gap-2" variant="outline"><ChevronDown className="size-4" />Genre</Button>} ></DropdownMenuTrigger>
              
                  <DropdownMenuContent>
                         <DropdownMenuGroup>
                                 <DropdownMenuLabel>Genres</DropdownMenuLabel>
                                 <DropdownMenuLabel>See lists of movies by genre</DropdownMenuLabel>
          
                                 <DropdownMenuItem className="grid grid-cols-5 gap-2 p-4">
                                     
                {genres.map((g) => (
                <button key={g.id} onClick={() => handleGenreClick(g.id)}>
                  {g.name} &gt;
                </button>
                ))}
              
              
                                 </DropdownMenuItem>
          
          
                         </DropdownMenuGroup>
        
      
                   </DropdownMenuContent>
        </DropdownMenu>

 
      <InputGroup className="flex items-center w-[379] h-[36] gap-2.5 rounded-lg border px-3">
        <InputGroupInput  id="inline-start-input" placeholder="Search..." />
        <InputGroupAddon align="inline-start">
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
      </InputGroup>
      </div>

       <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
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
    );
};