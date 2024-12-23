"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Contact() {
  const [contact, setContact] = useState([]);

  const fetchDataContact = () => {
    axios
      .get("/apis/contactData.json")
      .then(function (response) {
        console.log(response.data);
        setContact(response.data);
      })
      .catch(function (error) {
        console.log("Error fetching projects:", error);
      });
  };

  useEffect(() => {
    fetchDataContact();
    const intervalId = setInterval(() => {
      fetchDataContact();
    }, 1000);
  }, []);

  return (
    <section className="contact" id="contact">
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
