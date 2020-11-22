import React from "react";
import { Col, Container, Row } from "reactstrap";


function Achievement() {
    return (
        <section className="section section-lg section-hero section-shaped">
            <div className="shape shape-style-1" style={{ backgroundColor: "#9052FF" }}></div>
            <Container>
                <div className="col px-0">
                    <Row>
                        <Col lg='6'>
                            <img
                                alt="..."
                                className="img-fluid"
                                src={require("./../../assets/img/winner.svg")}

                            />

                        </Col>
                        <Col lg='6'>
                            <h1
                                className="display-4"
                                style={{ fontSize: "2rem", wordBreak: "break-word", color: 'white'  }}
                            >A step towards a winning strategy</h1>
                            <p className="lead-text" style={{ fontWeight: '500',color:'white' }}>
                                A comprehensive tool developed keeping the remote learning in mind and facilitate quality test taking methods to help achieve better.
                       
                      </p>
                        </Col>
                    </Row>

                </div>

            </Container>
        </section>

    )
}

export default Achievement;