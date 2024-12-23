import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import About from "../components/about-me/About";
import Projects from "../components/projects/Projects";
import Contact from "../components/contact/Contact";


export default function Home() {
  return (
    <>
          <About />
          <Projects />
          <Contact />

         
    </>

  );
}
