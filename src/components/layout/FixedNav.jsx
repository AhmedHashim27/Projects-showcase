"use client";
import { faGem, faHouse, faMarker, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
// استيراد ملف الـ CSS الخاص بـ AOS

export default function FixedNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNavbar, setShowNavbar] = useState(false); // حالة لتخزين ما إذا كان يجب إظهار navbar

  const handleClick = (index) => {
    setActiveIndex(index); // تحديث العنصر النشط
  };

  useEffect(() => {

    const handleScroll = () => {
      if (window.scrollY > 90) {
        setShowNavbar(true); // إضافة الكلاس عند التمرير لأكثر من 90px
      } else {
        setShowNavbar(false); // إزالة الكلاس إذا كان التمرير أقل من 90px
      }
    };

    window.addEventListener("scroll", handleScroll);

    // تنظيف الـ event listener عند تفكيك الـ component
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={`fixed-navbar ${showNavbar ? "show-fixed-navbar" : ""}`} >
      <ul className="list-unstyled" >
        <li
          className={activeIndex === 0 ? "active" : ""}
          onClick={() => handleClick(0)} // تغيير الحالة عند النقر
          
        >
          <Link href="#home">
            <FontAwesomeIcon icon={faHouse} className="fa-icon" />
          </Link>
        </li>
        <li
          className={activeIndex === 1 ? "active" : ""}
          onClick={() => handleClick(1)} // تغيير الحالة عند النقر
          
        >
          <Link href="#about">
            <FontAwesomeIcon icon={faUser} className="fa-icon" />
          </Link>
        </li>
        <li
          className={activeIndex === 2 ? "active" : ""}
          onClick={() => handleClick(2)} // تغيير الحالة عند النقر
          
        >
          <Link href="#projects">
            <FontAwesomeIcon icon={faGem} className="fa-icon" />
          </Link>
        </li>
        <li
          className={activeIndex === 3 ? "active" : ""}
          onClick={() => handleClick(3)} // تغيير الحالة عند النقر
          
        >
          <Link href="#contact">
            <FontAwesomeIcon icon={faMarker} className="fa-icon" />
          </Link>
        </li>
      </ul>
    </section>
  );
}
