"use client";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "emailjs-com";

export default function Contact() {
  const [contact, setContact] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const form = useRef(null);

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

  const fetchDataContact = () => {
    axios
      .get("/services/contactData.json")
      .then(function (response) {
        setContact(response.data);
      })
      .catch(function (error) {
        console.log("Error fetching contact:", error);
      });
  };

  useEffect(() => {
    fetchDataContact();

    const intervalId = setInterval(() => {
      fetchDataContact();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [contact]);

  const handleSendForm = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("All fields are required!");
      setStatus("");
      return;
    }

    setError("");

    // إرسال البيانات عبر EmailJS
    emailjs
      .sendForm(
        "service_pcdfv4fg",
        "template_3dcrcwi",
        form.current,
        "Q4A3oTNl-Qjpl4Pae"
      )
      .then(
        (result) => {
          console.log("SUCCESS:", result.text);
          setStatus("Message sent successfully!");

          // إفراغ الحقول بعد النجاح
          setFormData({
            fullName: "",
            email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          console.log("FAILED:", error.text);
          setStatus("Failed to send message");
        }
      );
  };

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
              <Form ref={form} onSubmit={handleSendForm}>
                <div className="header-contacts">
                  <h3>{item.section}</h3>
                </div>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="ahmed Hashim"
                        name="user_name"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="ahashim@vassar.edu"
                        name="user_email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Your subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Your Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a message here"
                    name="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Button variant="primary" type="submit">
                    Send Your Message
                  </Button>
                </Form.Group>
              </Form>
              {status && (
                <div
                  className="text-center mt-3 bg-success pt-3 pb-3 rounded text-capitalize"
                  dangerouslySetInnerHTML={{ __html: status }}
                />
              )}
              {error && (
                <p className="text-center  mt-3 bg-danger pt-3 pb-3 rounded text-capitalize">
                  {error}
                </p>
              )}
            </Col>
          </Row>
        </Container>
      ))}
    </section>
  );
}
