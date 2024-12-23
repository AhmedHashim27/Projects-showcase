import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <section className="footer">
      <div className="social-media-icons ">
        <ul className="list-unstyled d-flex justify-content-center gap-3">
          <li>
            <Link href="#">
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
          </li>
          <li>
            <Link href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </li>
          <li>
            <Link href="#">
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
          </li>
          <li>
            <Link href="#">
              <FontAwesomeIcon icon={faGithub} />
            </Link>
          </li>
          <li>
            <Link href="#">
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
          </li>
        </ul>
        <hr />
      </div>

      <div className="copyright text-center">
        <Container>
          <Row>
            <Col md={6}>
              <p className="text-upper">
                All Rights Reserved &copy; <span>Dev Ahemd </span>2024
              </p>
            </Col>

            <Col md={6}>
              <a
                className="text-light text-decoration-none text-uppercase"
                href="mailto:ahemdabdellatifhosny@gmail.com"
              >
                ahemdabdellatifhosny@gmail.com
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}
