import React, { Component } from "react";
import Navbar1 from "./navbar";
import Footer from "./footer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Container, Row } from 'reactstrap'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import axios from "axios";
import { backendURL } from '../utils/backURL'

class Result extends Component {
    state = {
        percentage: 0
    }

    getResults() {
        const { user } = this.props.auth
        const { location } = this.props
        axios
            .post(`${backendURL}/test/users/viewResult`, {
                "testId": location.state.key,
                "token": `${localStorage.getItem('jwtToken').split(" ")[1]}`,
                'studentEmail': user.email
            })
            .then((res) => {
                console.log(res)
                this.setState(
                    { percentage: (res.data.marks / location.state.totalMarks) * 100 }
                )
            })
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        setTimeout(() => {
            this.getResults();
        }, 500)

    }
    render() {
        let percentage = this.state.percentage
        percentage = parseFloat(percentage).toFixed(2)
        return (
            <>
                <Navbar1 />
                <div className="main-content" style={{ backgroundColor: '#5545bf' }}>
                    <section className="section section-lg section-hero section-exam">
                        <div className="shape shape-style-1 shape-default"></div>
                        <Container>
                            <section className="section section-shaped">
                                <div className="center-item">
                                    <h1 className="display-3 text-white">Results</h1>
                                </div>
                            </section>

                            <Row>
                                <Col lg='4'>
                                    <div className='perf'>
                                        <CircularProgressbar
                                            value={percentage}
                                            text={`${percentage}%`}
                                            styles={buildStyles({
                                                // Rotation of path and trail, in number of turns (0-1)
                                                rotation: 0.25,

                                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                strokeLinecap: 'butt',

                                                // Text size
                                                textSize: '16px',

                                                // How long animation takes to go from one percentage to another, in seconds
                                                pathTransitionDuration: 0.5,

                                                // Can specify path transition in more detail, or remove it entirely
                                                // pathTransition: 'none',

                                                // Colors
                                                pathColor: `rgb(255, 203, 65, ${percentage / 100})`,
                                                textColor: '#f88',
                                                trailColor: '#3e98c7',
                                                backgroundColor: '#3e98c7',
                                            })}
                                        /></div>
                                    <div className="center-item "><h1 className='text-white'>{percentage}%</h1></div>

                                </Col>
                                <Col lg='8'>
                                    <span className='text-white' style={{ marginTop: '2em' }}>
                                        <span style={{ fontSize: '1.5em', fontWeight: 'bold' }}> Congratulations!</span> <br />
                                        <span style={{ fontSize: '1em' }}> You have secured <b>{percentage}%</b> and continue exploring the opportunities further.</span><br /><br /><br />

                                        <span style={{ fontSize: '1em' }}> We wish you all the best and encourage you to go through all the available materials to avail more opportunities and sharpen your skills.</span>
                                    </span></Col>
                            </Row>





                        </Container>
                    </section>
                </div>

                <Footer />
            </>
        )
    }
}
Result.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(
    mapStateToProps
)(Result);