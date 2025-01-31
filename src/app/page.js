"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About from "../components/about-me/About";
import Projects from "../components/projects/Projects";
import Contact from "../components/contact/Contact";
import FixedNav from "../components/layout/FixedNav";
// @ts-ignore
import Experience from "../components/experience/Experience";



export default function Home() {


  return (
    <>
      <About />
      {/* <Experience /> */}
      <Projects />
      <Contact />
      <FixedNav />
    </>
  );
}
