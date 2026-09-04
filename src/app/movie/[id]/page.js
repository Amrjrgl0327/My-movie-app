"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useEffect } from "react";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
  },
};
const page = () => {
  const params = useParams();
  const movieId = params.id;
  //   /movie/${movieId}?language=en-US
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const detailRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options,
        );

        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          options,
        );

        const similarRes = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US`,
          options,
        );

        const detailData = await detailRes.json();
        const creditsData = await creditsRes.json();
        const similarData = await similarRes.json();
        console.log(detailData, "DETAILS");
        console.log(creditsData, "CREDITS");
        console.log(similarData, "SIMILAR");

        // setPopularMovies(data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovieDetail();
  }, []);

  return <div>{params.id}</div>;
};

export default page;
