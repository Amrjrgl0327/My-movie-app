// const options = {
//   method: "GET",
//   headers: {
//     accept: "application/json",
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8",
//   },
// };

// const fetchUpcoming = async () => {
//   try {
//     const res = await fetch(
//       "https://api.themoviedb.org/3//movie/upcoming?language=en-US&page=1&api-key",
//       options,
//     );
//     const data = await res.json();

//     console.log(data.results);
//   } catch (err) {
//     console.error(err);
//   }
// };

// fetchUpcoming();

// const fetchPopular = async () => {
//   try {
//     const res = await fetch(
//       "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api-key",
//       options,
//     );
//     const data = await res.json();

//     console.log(data.results);
//   } catch (err) {
//     console.error(err);
//   }
// };

// fetchPopular();

// const fetchTopRated = async () => {
//   try {
//     const res = await fetch(
//       "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api-key",
//       options,
//     );
//     const data = await res.json();

//     console.log(data.results);
//   } catch (err) {
//     console.error(err);
//   }
// };

// fetchTopRated();
