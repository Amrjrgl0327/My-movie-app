"use client";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Header } from "@/components/Header";
import { Import } from "lucide-react";
import { MovieCard } from "@/components/MovieCard";
import MovieSection from "@/components/MovieSection";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";
import { PopularMovies } from "@/components/PopularMovies";
import { TopRatedMovies } from "@/components/TopRatedMovies";
import { UpcomingMovies } from "@/components/UpcomingMovies";
import { Navbar } from "@/components/Navbar";

const page = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <Navbar />
     <Header />
      
      <UpcomingMovies />
      <PopularMovies />
      <TopRatedMovies />

      <Footer />
    </div>
  );
};

export default page;
