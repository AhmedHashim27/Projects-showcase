"use client";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Slider from "react-slick";
import axios from "axios";
import { useState, useEffect } from "react";

export default function About() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [about, setAbout] = useState([]);

  const fetchProjects = () => {
    axios
      .get("/apis/aboutData.json")
      .then(function (response) {
        setAbout(response.data);
      })
      .catch(function (error) {
        console.log("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchProjects();

    const intervalId = setInterval(() => {
      fetchProjects();
    }, 1000); //

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="about" id="about">
      {about.map((item, index) => (
        <Container fluid key={index}>
          <Row>
            <Col md={6}>
              <div className="about-img">
                <Image src={item.image} alt={item.title} fill />
              </div>
            </Col>
            <Col md={6}>
              <div className="about-info">
                <h2 className="text-uppercase my-4">{item.title}</h2>
                <p className="text-uppercase">{item.description}</p>
                <div className="skills text-center my-5">
                  <Slider {...settings}>
                    {item.skills &&
                      item.skills.map((skill, index) => (
                        <div key={index} className="skills-container">
                          <div className="slider-item">
                            <Image
                            className="mx-auto mb-3"
                              src={skill.image}
                              alt={skill.name}
                              width={100}
                              height={100}
                            />
                          </div>
                          <div className="skill-name text-center">
                            <h6>{skill.name}</h6>
                          </div>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ))}
    </section>
  );
}
