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
            <Link href="https://www.facebook.com/devahmedabdellatif" target="_blank">
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/programminginarabic/" target="_blank">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/@programinginarbic/videos" target="_blank">
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
          </li>
          <li>
            <Link href="https://github.com/ahmedabdellatifhosny" target="_blank">
              <FontAwesomeIcon icon={faGithub} />
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com/in/devahmedabdellatif/" target="_blank">
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
                className="text-light text-decoration-none "
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
