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
