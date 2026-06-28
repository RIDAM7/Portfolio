/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve modern formats first (smaller than PNG/JPEG) for any next/image use.
  // Falls back automatically for browsers that don't support them.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
