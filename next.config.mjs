/** @type {import('next').NextConfig} */
const nextConfig = {
  parser: "babel-eslint",
  extends: ["eslint:recommended", "plugin:react/recommended"],
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
  webpack: (config, { isServer }) => {
    // تخصيص إعدادات Webpack هنا إذا لزم الأمر
    return config;
  },
};

export default nextConfig;
