import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import NavBar1 from './navbar'
import { logout } from '../actions/authActions'
import Footer from './footer';
class Error extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    onLogout = e => {
        this.props.logout();
    }
    render() {
        return (
            <>
                <NavBar1 />
                <div className="main-content" style={{ backgroundColor: '#5545bf' }}>
                    <section className="section section-lg section-shaped">
                        <div className="shape shape-style-1 shape-default">

                        </div>
                        <Container className="py-md">
                            <Row className="row-grid justify-content-between align-items-center">
                                <div style={{ margin: "auto", textAlign: "center" }}>
                                    <Col lg="12">
                                        <img
                                            alt="..."
                                            className="img-fluid"
                                            style={{ paddingBottom: "1em", height: "20em" }}
                                            src={require("./../assets/img/global_error.svg")}

                                        />
                                        <h1 className="display-3 text-white">
                                            Oops, something went wrong!
                                    </h1>
                                        <p className="lead text-white">

                                            Please login again to proceed.   </p>


                                        <Link to="/">
                                            <Button
                                                className="my-4"
                                                type="submit"
                                                color='warning'
                                                onClick={this.onLogout}
                                            >
                                                Login
                                </Button>
                                        </Link>
                                    </Col>
                                </div>
                            </Row>
                        </Container>
                    </section>
                </div>
                <Footer />
            </>

        )
    }
}
Error.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, { logout })(Error)