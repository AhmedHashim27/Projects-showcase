"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Contact() {
  const [contact, setContact] = useState([]);

  // تهيئة AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // مدة التأثير
      easing: "ease-in-out", // تأثير التحرك
      once: false, // لا يتم تنفيذ التأثير مرة واحدة فقط
      offset: 200, // التأثير يبدأ عندما يصل العنصر إلى 200px من أعلى الصفحة
    });

    return () => {
      AOS.refresh(); // تحديث التأثيرات عند فك التثبيت
    };
  }, []);

  // جلب بيانات الاتصال
  const fetchDataContact = () => {
    axios
      .get("/apis/contactData.json")
      .then(function (response) {
        console.log(response.data);
        setContact(response.data);
      })
      .catch(function (error) {
        console.log("Error fetching contact:", error);
      });
  };

  // جلب البيانات مرة واحدة عند تحميل الصفحة
  useEffect(() => {
    fetchDataContact();

    // إذا كنت بحاجة إلى جلب البيانات بشكل دوري (مثل كل ثانية)
    const intervalId = setInterval(() => {
      fetchDataContact();
    }, 1000); // يتم التحديث كل ثانية

    // تنظيف عند فك التثبيت
    return () => clearInterval(intervalId);
  }, []);

  // استخدام AOS بعد تحميل البيانات
  useEffect(() => {
    AOS.refresh(); // إعادة تحديث التأثيرات بعد تحميل البيانات
  }, [contact]); // تتغير عندما يتم تحديث contact

  return (
    <section className="contact" id="contact" data-aos="fade-in">
      {contact.map((item, index) => (
        <Container key={index}>
          <Row>
            <Col md={6}>
              <div className="contact-info">
                <Image
                  src={item.image}
                  width={100}
                  height={100}
                  alt={item.title}
                  priority
                />
                <p>{item.title}</p>
                <h2>{item.description}</h2>
                <h6>{item.hint}</h6>
              </div>
            </Col>
            <Col md={6}>
              <Form>
                <div className="header-contacts">
                  <h3>{item.section}</h3>
                </div>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>FullName</Form.Label>
                      <Form.Control type="text" placeholder="ahmed abdellatif" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="ahmedabdellatifhosny@gmail.com" />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>subject</Form.Label>
                  <Form.Control type="text" placeholder="your subject" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>your message</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a message here"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Button variant="primary" type="submit">
                    send your message
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      ))}
    </section>
  );
}
