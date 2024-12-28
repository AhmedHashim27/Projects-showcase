import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style/globals.css";

import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Dev Ahmed - Portfolio",
  description: "Portfolio of Dev Ahmed - frontend developer ",
  icons: {
    icon: "/images/header/hero-avatar.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
