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
  const [activeItem, setActiveItem] = useState("home");

  // دالة handleItemClick المعدلة
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const [hero, setHero] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/apis/headerData.json");
      // console.log(response.data); // تحقق من البيانات
      setHero(response.data);
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects(); // استدعاء البيانات مرة واحدة عند تحميل الصفحة

    const intervalId = setInterval(() => {
      fetchProjects();
    }, 10000); 

    return () => clearInterval(intervalId);
  }, []);

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
                      onClick={() => handleItemClick(item)} // تعيين activeItem عند النقر
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="hero-text">
                  <h1 className="text-uppercase text-center">
                    {item.name} <br /> {item.title}
                  </h1>
                  <p className="text-center text-uppercase my-4">{item.hint}</p>
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
            <p>Loading...</p> // عرض رسالة تحميل إذا لم يتم تحميل البيانات بعد
          )}
        </Container>
      </div>
    </section>
  );
}
