"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Link from "next/link";
export default function Header() {
  return (
    <section className="header">
      <div className="menu">
        <Navbar expand="lg" className="bg-body-tertiary py-4">
          <Container>
            <Navbar.Brand href="#home" className="text-capitalize fw-bold ">
              <span> dev</span> ahmed
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
              <Nav className="ms-auto text-uppercase">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">about</Nav.Link>
                <Nav.Link href="#link">projects</Nav.Link>
                <Nav.Link href="#link">contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="hero text-light ">
        <Container>
          <div className="hero-content">
            <div className="hero-image">
              <Image
                className="rounded-circle shadow d-flex"
                src={"/assets/images/header/hero-avatar.jpg"}
                alt="hero-bg"
                width={150}
                height={150}
              />
            </div>
            <div className="hero-text">
              <h1 className="text-uppercase text-center">
                professional <br /> frontend developer
              </h1>
              <p className="text-center text-uppercase my-4">
                Hi, I’m ahmed, A creative Frontend Developer passionate about crafting intuitive and engaging user interfaces.
              </p>
            </div>
            <div className="hero-button my-4  ">
              <Link href={"/contact"}>
              <span></span>
              <Button className="text-uppercase fw-bold" variant="primary">
                get in touch
              </Button>
              </Link>
            
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
