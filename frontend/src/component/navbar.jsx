import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, NavbarBrand, Nav, UncontrolledCollapse, NavItem, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from '../actions/authActions'
class Navbar1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  onLogout = e => {
    // e.preventDefault();
    this.props.logout();
    // this.props.history.push('/');
  }
  loginCheck() {
    const { user } = this.props.auth
    if (user.teacherName || user.name) {
      this.setState({
        loggedIn: true
      })
    }
  }
  componentDidMount() {
    this.loginCheck()
  }
  render() {
    return (
      <div>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5">
                <Link to='/'>
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("./../assets/logo.svg")}
                  style={{ height: "3em" }}
                  /></Link>
              </NavbarBrand>
              {this.state.loggedIn ? (
                <>
                  <button className="navbar-toggler" id="navbar_global">
                    <span className="navbar-toggler-icon" />
                  </button>
                  <UncontrolledCollapse navbar toggler="#navbar_global">
                    <div className="navbar-collapse-header">
                      <Row>
                        <Col className="collapse-brand" xs="6">

                        </Col>
                        <Col className="collapse-close" xs="6">
                          <button className="navbar-toggler" id="navbar_global">
                            <span />
                            <span />
                          </button>
                        </Col>
                      </Row>
                    </div>
                    <Nav className="align-items-lg-center ml-lg-auto" navbar>
                      <NavItem>
                        <Link to='/'><div>
                          <span onClick={this.onLogout}>Logout</span>
                        </div>
                        </Link>
                      </NavItem>
                    </Nav>
                  </UncontrolledCollapse>
                </>
              ) : <></>}

            </Container>
          </Navbar>
        </header>
      </div>
    );
  }
}
Navbar1.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navbar1);
