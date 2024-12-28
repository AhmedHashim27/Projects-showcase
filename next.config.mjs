/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // السماح بكل المسارات
      },
      {
        protocol: "https",
        hostname: "devahmed.vercel.app",
        pathname: "/**", // السماح بكل المسارات
      },
    ],
    dangerouslyAllowSVG: true, // تمكين تحميل صور SVG
  },
};

export default nextConfig;
