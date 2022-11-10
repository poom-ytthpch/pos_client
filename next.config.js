/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    GQL_URL: process.env.GQL_URL,
    PERSIST_KEY: process.env.PERSIST_KEY,
  },
};

module.exports = nextConfig;
