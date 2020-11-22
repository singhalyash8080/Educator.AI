import React, { Component } from "react";
import { Row, Container, Button, Col } from "reactstrap";
import { Link } from "react-router-dom";
import Navbar1 from "../navbar";
import Footer from "../footer";
import Achievement from "./achievements";
import Features from "./features";
class Hero extends Component {
  render() {
    return (
      <>
        <Navbar1 />
        <div className="main-content">
          <section className="section section-lg section-hero section-shaped">

            <div className="shape shape-style-1 shape-default"></div>
            <Container className="py-lg-md py-sm d-flex">
              <div className="col px-0">
                <Row>
                  <Col>
                    <img
                      alt="..."
                      className="img-hero"
                      style={{ opacity: '50%' }}
                      src={require("./../../assets/img/hero-dash.svg")}

                    />
                    <div className="header-text">
                      <h1
                        className="display-4"
                        style={{ fontSize: "2rem", wordBreak: "break-word" }}
                      >
                        Get the best learning content with AI <br /> powered
                        learning engine.
                      </h1>
                      <p className="lead-text" style={{ fontWeight: '500' }}>
                        We have worked in order to bring you a comprehensive
                        <br /> intelligent and automated learning environment
                      </p>

                      <div className="btn-wrapper mt-4">
                        <Link to="/login">
                          <Button
                            className="btn-icon mb-3 mb-sm-0 mx-2"
                            color="primary"
                          >
                            <span className="btn-inner--text">For Students</span>
                          </Button>
                        </Link>
                        <Link to="/loginTeacher">
                          <Button
                            className="btn-icon mb-3 mb-sm-0 mx-2"
                            color="primary"
                          >
                            <span className="btn-inner--text">For Teachers</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </section>
          <Achievement />
          <Features />
        </div>
        <Footer />
      </>
    );
  }
}

export default Hero;
