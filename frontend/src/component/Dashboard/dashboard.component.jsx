import React, { Component } from "react";
import Navbar1 from "../navbar";
import { Container } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Footer from "../footer";
import Manage from "./manage.component";
import Resources from './resources.component';
import Tabs from './tabs/tabs'
import VideoTeacher from "./videoTeacher.component";
class Dashboard extends Component { 

  render() {
    const { user } = this.props.auth
    return (
      <>
        <Navbar1 />
          <div className="main-content">
            <section className="section section-lg section-hero section-shaped">
              <div className="shape shape-style-1 shape-default"></div>
              <Container>
                <section className="section section-shaped">
                  <div
                    className="shape shape-style-1 shape-default greeting-box"
                    style={{ backgroundColor: "#FDB813", borderRadius: "1em" }}
                  ></div>
                  <div style={{ position: "absolute", right: "2em" }}>
                    <img
                      alt="..."
                      className="img-fluid flame-success"
                      src={require("./../../assets/img/flame-success 1.svg")}
                      style={{ marginTop: "-10em" }}
                    />
                  </div>
                  <div className="dash-head-text">
                    <h3 className="text-white">
                    <b>Hello {user.name || user.teacherName}!</b>
                    </h3>
                  </div>
              </section>
                <div
                  style={{
                    margin: "5em 2em",
                  }}
              >                 
                  <Tabs>
                    <div label="Manage">
                      <Manage />
                    </div>
                    <div label="Resources">
                      <Resources />
                  </div>
                  <div label="Videos">
                    <VideoTeacher />
                  </div>
                    <div>

                  </div></Tabs>


              </div>
              </Container>
            </section>
        </div>

        <Footer />
      </>
    );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  tutor: PropTypes.object.isRequired

}
const mapStateToProps = state => ({
  auth: state.auth,
  tutor: state.tutor
})
export default connect(
  mapStateToProps
)(Dashboard);
