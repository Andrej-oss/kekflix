"use strict";
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmbd.org"]
  },
  plugins: [require('tailwindcss-textshadow')]
}
