import React from 'react';
import { Container, Row, Col } from 'reactstrap';

function Features() {
    return (
        <>
            <section className="section section-lg section-hero section-shaped">
                <div className="shape shape-style-1 shape-default"></div>
                <Container>
                    <div className="center-item">
                        <Row>
                            <Col lg='4'>
                                <img
                                    alt="..."
                                    className="img-fluid"
                                    src={require("./../../assets/img/clock.svg")}
                                    style={{ height: '8em', marginBottom: '2em' }}
                                />
                                <span classname='feature-header' style={{ fontSize: '1.2em', display: 'block' }}><b>Faster question generation</b></span>
                                <span classname='feature-header' style={{ fontSize: '1.2em', display: 'block', margin: '1em' }}>Unmatched question generation speed that not ony sppeds up productivity but gives optimal performance.</span>
                            </Col>
                            <Col lg='4'>
                                <img
                                    alt="..."
                                    className="img-fluid"
                                    src={require("./../../assets/img/exam.svg")}
                                    style={{ height: '8em', marginBottom: '2em' }}
                                />
                                <span classname='feature-header' style={{ fontSize: '1.2em', display: 'block' }}><b>Unobstrusive exam interface</b></span>
                                <span classname='feature-header' style={{ fontSize: '1.2em', display: 'block', margin: '1em' }}>The exam interface is designed to provide seamless ,operational and fluid experience to the students.</span>
                            </Col>
                            <Col lg='4'>
                                <img
                                    alt="..."
                                    className="img-fluid"
                                    src={require("./../../assets/img/ruler.svg")}
                                    style={{ height: '8em', marginBottom: '2em' }}

                                />
                                <span classname='feature-header' style={{ fontSize: '1.2em', display: 'block' }}><b>Platform for performance measurement</b></span>
                                <span classname='feature-header' style={{ fontSize: '1.2em', display: 'block', margin: '1em' }}>Provides a single click interface to assess the performance of the students.</span>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default Features;
