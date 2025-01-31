"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";

export default function Header() {
  const [activeItem, setActiveItem] = useState("home");
  const [hero, setHero] = useState([]);

  // Handle navigation item clicks
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  // Fetch data (same as before)
  const fetchProjects = async () => {
    try {
      const response = await axios.get("/services/headerData.json");
      setHero(response.data);
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    const intervalId = setInterval(() => {
      fetchProjects();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  // -----------------------------------------
  // 1) Dynamic "hint" text feature
  // -----------------------------------------

  // State to hold the dynamically typed text
  const [displayText, setDisplayText] = useState("");

  // Ref to store typing data (so it doesn't reset on re-renders)
  const typingRef = useRef({
    timer: null,
    currentIndex: 0,
    currentLanguageIndex: 0
  });

  // List of languages/snippets you want to rotate
  const languages = useMemo(
    () => [
      { name: "JavaScript", code: 'console.log("Full-Stack Software Engineer");' },
      { name: "Python", code: 'print("Full-Stack Software Engineer")' },
      { name: "Java", code: 'System.out.println("Full-Stack Software Engineer");' },
      { name: "C++", code: 'std::cout << "Full-Stack Software Engineer" << std::endl;' }
    ],
    []
  );

  // Typing effect
  const typeEffect = useCallback((text, onComplete) => {
    clearInterval(typingRef.current.timer);
    typingRef.current.currentIndex = 0;
    setDisplayText("");

    typingRef.current.timer = setInterval(() => {
      if (typingRef.current.currentIndex < text.length) {
        setDisplayText(text.slice(0, typingRef.current.currentIndex + 1));
        typingRef.current.currentIndex++;
      } else {
        clearInterval(typingRef.current.timer);
        if (onComplete) onComplete();
      }
    }, 50);
  }, []);

  // Function to rotate through the different language snippets
  const rotateLanguages = useCallback(() => {
    const currentLanguage = languages[typingRef.current.currentLanguageIndex];
    typeEffect(currentLanguage.code, () => {
      setTimeout(() => {
        typingRef.current.currentLanguageIndex =
          (typingRef.current.currentLanguageIndex + 1) % languages.length;
        rotateLanguages();
      }, 4000); // Change snippet every 5 seconds
    });
  }, [languages, typeEffect]);

  // Start rotating the snippets on mount
  useEffect(() => {
    rotateLanguages();
    return () => clearInterval(typingRef.current.timer);
  }, [rotateLanguages]);

  // -----------------------------------------
  // 2) Rendering (same as before, except hint replaced by displayText)
  // -----------------------------------------
  return (
    <section className="header" id="home" data-aos="fade-in">
      <div className="menu">
        <Navbar expand="lg" className="py-4">
          <Container>
            <Navbar.Brand href="#home" className="text-capitalize fw-bold">
              <span> dev</span> ahmed
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              style={{ backgroundColor: "#fff" }}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto text-uppercase">
                {["home", "about", "projects", "contact"].map((item, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link
                      as={Link}
                      href={`#${item}`}
                      className={activeItem === item ? "active" : ""}
                      onClick={() => handleItemClick(item)}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="hero text-light">
        <Container>
          {hero.length > 0 ? (
            hero.map((item, index) => (
              <div className="hero-content" key={index}>
                <div className="hero-image">
                  <Image
                    className="rounded-circle shadow d-flex"
                    src={item.image}
                    alt={item.name}
                    width={150}
                    height={150}
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                  />
                </div>
                <div className="hero-text">
                  <h1 className="text-uppercase text-center">
                    {item.name} <br /> {item.title}
                  </h1>
                  {/* Replace the old hint with displayText */}
                  <p className="text-center text-uppercase my-4">
                    {displayText}
                  </p>
                </div>
                <div className="hero-button my-4">
                  <span></span>
                  <Link href="#contact">
                    <Button className="text-uppercase fw-bold" variant="primary">
                      {item.btn}
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </Container>
      </div>
    </section>
  );
}