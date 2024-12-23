"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Header() {
  const [hero, setHero] = useState([]);
  const fetchProjects = () => {
    axios
      .get("/apis/headerData.json")
      .then(function (response) {
        setHero(response.data);
      })
      .catch(function (error) {
        console.log("Error fetching projects:", error);
      });
  };

  useEffect(() => {
    fetchProjects();

    const intervalId = setInterval(() => {
      fetchProjects();
    }, 1000); //

    return () => clearInterval(intervalId);
  }, []); //

  return (
    <section className="header">
      <div className="menu">
        <Navbar expand="lg" className="bg-body-tertiary py-4">
          <Container>
            <Navbar.Brand href="#home" className="text-capitalize fw-bold">
              <span> dev</span> ahmed
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto text-uppercase">
                <Nav.Link as={Link} href="#home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} href="#link">
                  About
                </Nav.Link>
                <Nav.Link as={Link} href="#projects">
                  Projects
                </Nav.Link>
                <Nav.Link as={Link} href="#contact">
                  Contact
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="hero text-light">
        <Container>
          {hero.map((item, index) => (
            <div className="hero-content" key={index}>
              <div className="hero-image">
                <Image
                  className="rounded-circle shadow d-flex"
                  src={item.image}
                  alt={item.name}
                  width={150}
                  height={150}
                />
              </div>
              <div className="hero-text">
                <h1 className="text-uppercase text-center">{item.name}</h1>
                <p className="text-center text-uppercase my-4">{item.hint}</p>
              </div>
              <div className="hero-button my-4">
                <Link href="/contact">
                  <Button className="text-uppercase fw-bold" variant="primary">
                    {item.btn}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
