import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="footer">
          <Container>
            <Row className=" align-items-center my-4">
              <Col md="12">
                <div style={{ textAlign: "center" }} className="mt-3">
                  <span
                    style={{
                      color: "white",
                      fontSize: "1em",
                      opacity: '40%'
                    }}
                  >
                    Educator.ai
                  </span>
                </div>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    );
  }
}
export default Footer;
