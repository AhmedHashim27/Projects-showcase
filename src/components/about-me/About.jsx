"use client";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Slider from "react-slick";

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

  return (
    <section className="about">
      <Container fluid>
        <Row>
          <Col md={6}>
            <div className="about-img">
              <Image
                src={"/assets/images/header/hero-avatar.jpg"}
                alt="about"
                fill
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="about-info">
              <h2 className="text-uppercase my-4">About me</h2>
              <p className="text-uppercase">
                I’m Ahmed Abdellatif, a skilled Frontend Developer with
                experience since 2019, specializing in building responsive and
                dynamic web interfaces. Proficient in HTML, CSS, Bootstrap,Sass,
                JavaScript, React.js, and Next.js, I combine creativity and
                technical expertise to deliver seamless and engaging user
                experiences that meet modern web standards.
              </p>
              <div className="skills text-center my-5">
                <div className="slider-container ">
                  <Slider {...settings}>
                    <div className="skills-container ">
                      <div className="slider-item">
                        <Image
                          src={"/assets/images/skills/html.png"}
                          fill
                          alt="html"
                        />
                      </div>
                      <div className="skill-name text-center ">
                        <h6>HTML</h6>
                      </div>
                    </div>

                    <div className="skills-container">
                      <div className="slider-item">
                        <Image
                          src={"/assets/images/skills/css.png"}
                          fill
                          alt="css"
                        />
                      </div>
                      <div className="skill-name text-center ">
                        <h6>css</h6>
                      </div>
                    </div>

                    <div className="skills-container">
                      <div className="slider-item">
                        <Image
                          src={"/assets/images/skills/bootstrap.png"}
                          fill
                          alt="bootstrap"
                        />
                      </div>
                      <div className="skill-name text-center ">
                        <h6>bootstrap</h6>
                      </div>
                    </div>

                    <div className="skills-container">
                      <div className="slider-item">
                        <Image
                          src={"/assets/images/skills/sass.png"}
                          fill
                          alt="sass"
                        />
                      </div>
                      <div className="skill-name text-center ">
                        <h6>sass</h6>
                      </div>
                    </div>

                    <div className="skills-container">
                      <div className="slider-item">
                        <Image
                          src={"/assets/images/skills/javascript.png"}
                          fill
                          alt="javascript"
                        />
                      </div>
                      <div className="skill-name text-center ">
                        <h6>javascript</h6>
                      </div>
                    </div>

                    <div className="skills-container">
                      <div className="slider-item">
                        <Image
                          src={"/assets/images/skills/git.png"}
                          fill
                          alt="git"
                        />
                      </div>
                      <div className="skill-name text-center ">
                        <h6>git</h6>
                      </div>
                    </div>
                    <div className="skills-container">
                      <div className="slider-item">
                        <Image
                          src={"/assets/images/skills/react.png"}
                          fill
                          alt="reactjs"
                        />
                      </div>
                      <div className="skill-name text-center ">
                        <h6>reactjs</h6>
                      </div>
                    </div>
                    <div className="skills-container">
                      <div className="slider-item">
                        <Image
                          src={"/assets/images/skills/next.png"}
                          fill
                          alt="nextjs"
                        />
                      </div>
                      <div className="skill-name text-center ">
                        <h6>nextjs</h6>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
