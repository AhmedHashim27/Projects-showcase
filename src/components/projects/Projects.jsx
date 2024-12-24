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
      .get("/apis/projectsData.json")
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

  const projectsImage = [
    { id: 1, image: "/images/projects/17-styler.png" },
    { id: 2, image: "/images/projects/15-patech.png" },
    { id: 3, image: "/images/projects/14-pastore.png" },
    { id: 4, image: "/images/projects/5-meamar.png" },
    { id: 5, image: "/images/projects/16-taptravel.png" },
    { id: 6, image: "/images/projects/2-develogs.png" },
    { id: 7, image: "/images/projects/7-pms.png" },
    { id: 8, image: "/images/projects/10-shaly.png" },
    { id: 9, image: "/images/projects/1-dashboard.png" },
    { id: 10, image: "/images/projects/4-hoochat.png" },
    { id: 11, image: "/images/projects/6-nice-day.png" },
    { id: 12, image: "/images/projects/11-smart-avenue.png" },
    { id: 13, image: "/images/projects/12-wfitness.png" },
    { id: 14, image: "/images/projects/13-portfoliov1.png" },
    { id: 15, image: "/images/projects/3-elmskny.png" },
    { id: 16, image: "/images/projects/9-roukhsa.png" },
    { id: 17, image: "/images/projects/18-sample.png" }, // الصورة رقم 17
  ];

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
                  key={index}
                  src={projectsImage[index]?.image} // اختار الصورة بناءً على الفهرس
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
