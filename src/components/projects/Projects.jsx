"use client";
import { Container } from "react-bootstrap";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/dist/client/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

export default function Projects() {
  const [activeItem, setActiveItem] = useState("all");
  const handleItemClick = ({ item }) => {
    setActiveItem(item);
  };
  const [projects, setProjects] = useState([]);
  const filteredProjects =
    activeItem === "all"
      ? projects
      : projects.filter((project) => {
          return project.category === activeItem;
        });

  // دالة لتحميل البيانات
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
    // تحميل البيانات أول مرة
    fetchProjects();

    // تحديث البيانات كل 10 دقائق (600000 ملي ثانية)
    const intervalId = setInterval(() => {
      fetchProjects(); // تحديث البيانات
      // يمكنك هنا إضافة revalidatePath إذا كنت تستخدم Next.js
      // revalidatePath('/path');
    }, 1000); // يتم التحديث كل 10 دقائق

    // تنظيف التايمر عند تدمير المكون
    return () => clearInterval(intervalId);
  }, []); // سيتم تنفيذ هذا مرة واحدة فقط عند تحميل المكون

  return (
    <section className="projects">
      <Container>
        <div className="navigation text-uppercase mb-5">
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
        </div>

        <div className="projects-filter">
          {filteredProjects.map((project, index) => (
            <div key={index} className={`box${index + 1}`}>
              <div className="head-image">
                <Image src={project.image} alt={project.name} fill />
                <div className="project-details text-center">
                  <div className="desc">
                    <h4 className="text-uppercase">{project.name}</h4>
                    <p className="text-uppercase">{project.type}</p>
                    <div className="links">
                      <ul className="list-unstyled d-flex justify-content-center align-items-center gap-3">
                        <li>
                          {project.github && (
                            <Link href={project.github}>
                              <FontAwesomeIcon icon={faGithubAlt} />
                            </Link>
                          )}
                        </li>
                        <li>
                          {project.vercel && (
                            <Link href={project.vercel}>
                              <FontAwesomeIcon icon={faLink} />
                            </Link>
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
