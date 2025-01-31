"use client";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Slider from "react-slick";
import axios from "axios";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// 1) Import react-spring
import { useSpring, animated } from "react-spring";

export default function About() {
  const [about, setAbout] = useState([]);

  // --------------------------------------------------
  // AOS Initialization
  // --------------------------------------------------
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      offset: 200,
    });
    return () => {
      AOS.refresh();
    };
  }, []);

  // --------------------------------------------------
  // Slider settings (react-slick)
  // --------------------------------------------------
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "ease-in-out",
    arrows: false,
    draggable: true,
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

  // --------------------------------------------------
  // Fetching data from aboutData.json
  // --------------------------------------------------
  const fetchProjects = () => {
    axios
      .get("/services/aboutData.json")
      .then(function (response) {
        setAbout(response.data);
      })
      .catch(function (error) {
        console.log("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchProjects();
    // Example: Re-fetch data every 1 second (not recommended in production)
    const intervalId = setInterval(() => {
      fetchProjects();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Re-initialize AOS on data update
  useEffect(() => {
    AOS.refresh();
  }, [about]);

  // --------------------------------------------------
  // 2) Spin animation with react-spring
  // --------------------------------------------------
  // If you’d prefer to spin the *entire slider*, you can wrap the Slider with animated.div.
  // Below, we just spin each skill icon individually.

  const spinProps = useSpring({
    loop: true,       // repeats forever
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
    config: { duration: 3000 }, // 3 seconds per full rotation
  });

  return (
    <section className="about" id="about" data-aos="fade-in">
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
                            {/* 3) Wrap the skill icon in an animated.div to apply the spinProps */}
                            <animated.div style={spinProps}>
                              <Image
                                className="mx-auto mb-3"
                                src={skill.image}
                                alt={skill.name}
                                width={100}
                                height={100}
                              />
                            </animated.div>
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
