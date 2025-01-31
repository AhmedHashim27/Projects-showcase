"use client";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Slider from "react-slick";
import axios from "axios";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Experience() {
  const [experience, setExperience] = useState([]);

  // Initialize AOS
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

  // Slider settings (same as About section, but reversed direction)
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
    rtl: true, // Reverse direction for leftward motion
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

  // Fetch experience data (Updated to use company logos instead of skills)
  const fetchExperience = () => {
    axios
      .get("/services/expData.json") // Make sure the file name is correct
      .then(function (response) {
        setExperience(response.data);
      })
      .catch(function (error) {
        console.log("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchExperience();
    const intervalId = setInterval(() => {
      fetchExperience();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Re-initialize AOS on data update
  useEffect(() => {
    AOS.refresh();
  }, [experience]);

  return (
    <section className="experience" id="experience" data-aos="fade-in">
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Title and Description */}
          <Col md={3} className="text-left experience-text">
            <h2 className="text-uppercase my-4 experience-title">Experience</h2>
            <p className="text-uppercase experience-desc">
              Companies that I've interned at
            </p>
          </Col>

          {/* Right Side - Slider (Now limited to the center of the screen) */}
          <Col md={6} className="text-center">
            <div className="company-slider my-5">
              <Slider {...settings}>
                {experience.map((company) => (
                  <div key={company.id} className="company-container">
                    <div className="slider-item">
                      <Image
                        className="mx-auto mb-3"
                        src={company.logo}
                        alt={company.name}
                        width={120}
                        height={120}
                      />
                    </div>
                    <div className="company-name text-center">
                      <h6>{company.name}</h6>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
