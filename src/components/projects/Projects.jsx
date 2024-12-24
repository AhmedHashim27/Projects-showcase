"use client";
import { Container } from "react-bootstrap";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Projects() {
  const [activeItem, setActiveItem] = useState("all");

  useEffect(() => {
    AOS.init({
      duration: 1000, // مدة التأثير
      easing: "ease-in-out", // تأثير التحرك
      once: false, // لا يتم تنفيذ التأثير مرة واحدة فقط
      offset: 200, // التأثير يبدأ عندما يصل العنصر إلى 200px من أعلى الصفحة
    });

    return () => {
      AOS.refresh(); // إعادة تحديث التأثيرات عند فك التثبيت
    };
  }, []);

  const handleItemClick = ({ item }) => {
    setActiveItem(item);
  };

  const [projects, setProjects] = useState([]);

  const filteredProjects =
    activeItem === "all"
      ? projects
      : projects.filter((project) => project.category === activeItem);

  const fetchProjects = () => {
    axios
      .get("/services/projectsData.json")
      .then(function (response) {
        setProjects(response.data);
      })
      .catch(function (error) {
        console.log("Error fetching projects:", error);
      });
  };

  useEffect(() => {
    fetchProjects();

    const intervalId = setInterval(() => {
      fetchProjects();
    }, 1000); // تحديث البيانات كل ثانية

    return () => clearInterval(intervalId);
  }, []); // تحميل المشاريع عند بدء التشغيل

  // استدعاء AOS.refresh() عند تحديث المشاريع
  useEffect(() => {
    AOS.refresh(); // تحديث التأثيرات بعد تحميل المشاريع
  }, [projects]); // التفاعل مع تحديث بيانات المشاريع

  return (
    <section className="projects" id="projects" data-aos="fade-in">
      <Container>
        <div className="navigation text-uppercase mb-5">
          <ul className="list-unstyled d-flex gap-3">
            {["all", "native", "framework"].map((item, index) => (
              <li
                key={index}
                className={activeItem === item ? "active" : ""}
                onClick={() => handleItemClick({ item })}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="projects-filter">
          {filteredProjects.map((project, index) => (
            <div key={index} className={`box${index + 1}`} data-aos="fade-up">
              <div className="head-image">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="project-details text-center">
                  <div className="desc">
                    <h4 className="text-uppercase">{project.name}</h4>
                    <p className="text-uppercase">{project.type}</p>
                    <div className="links">
                      <ul className="list-unstyled d-flex justify-content-center align-items-center gap-3">
                        <li>
                          {project.github && (
                            <div className="links-container">
                              <Link href={project.github} target="_blank">
                                <div className="li-content">
                                  <FontAwesomeIcon
                                    icon={faGithubAlt}
                                    className="fa-icon"
                                  />
                                  <span>GitHub</span>
                                </div>
                              </Link>
                            </div>
                          )}
                        </li>
                        <li>
                          {project.vercel && (
                            <div className="link-container">
                              <Link href={project.vercel} target="_blank">
                                <div className="li-content">
                                  <FontAwesomeIcon
                                    icon={faLink}
                                    className="fa-icon"
                                  />
                                  <span>Visit Site</span>
                                </div>
                              </Link>
                            </div>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
