/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://image.tmdb.org/**")],
  },
  env: {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  },
};

export default nextConfig;
