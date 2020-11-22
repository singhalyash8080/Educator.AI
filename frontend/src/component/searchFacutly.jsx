import React, { Component } from "react";
import Navbar1 from "./navbar";
import { Container, Button, Row, Col, FormGroup, InputGroup, Input, InputGroupAddon, InputGroupText } from "reactstrap";
import Footer from "./footer";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { backendURL } from "../utils/backURL";
import { setPreferred, setMyTutor } from './../actions/searchAction'
class SearchFaculty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: '',
            vision: '',
            top3Result: [],
            otherResult: [],
            myTutor: '',
            isSearch: false,
            moreSearch: false,
            testCreated: [],
            errors: {}
        }
    }
    onChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    searchFaculty = e => {
        e.preventDefault();
        axios
            .post(`${backendURL}/test/users/search`, {
                "course": this.state.course,
                "vision": this.state.vision,
                "token": `${localStorage.getItem('jwtToken').split(" ")[1]}`


            })
            .then((res) => {
                console.log(res.data)
                this.setState({
                    top3Result: res.data.top3Result,
                    otherResult: res.data.OtherResults,
                    isSearch: true
                })

            })

    }
    setTutor = e => {
        const data = {
            myTutor: this.state.myTutor,
            testCreated: this.state.testCreated
        }
        this.props.setMyTutor(data)
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.tutor.isTeachSelect) {
            this.props.history.push('/dashboard1');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.tutor.isTeachSelect) {
            this.props.history.push('/dashboard1')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    render() {
        return (
            <>
                <Navbar1 />
                <div className="main-content" style={{ backgroundColor: '#5545bf' }}>
                    <section className="section section-lg section-hero section-exam">
                        <div className="shape shape-style-1 shape-default"></div>
                        <Container>
                            <Row>
                                <Col md='6'>
                                    <section className="section section-shaped">
                                        <div className="center-item">

                                            <h1 className="display-3 text-white">Search for your faculty</h1>
                                            <form noValidate onSubmit={this.searchFaculty}>

                                                <FormGroup>
                                                    <InputGroup className="input-group-alternative" style={{ marginTop: '1em' }}>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="fa fa-user" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            placeholder="Name of Course"
                                                            type="text"
                                                            id="course"
                                                            onChange={this.onChange}
                                                            value={this.state.course}
                                                        />
                                                    </InputGroup>
                                                    <InputGroup className="input-group-alternative" style={{ marginTop: '1em' }}>
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="fa fa-user" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            placeholder="vision"
                                                            type="textarea"
                                                            id="vision"
                                                            onChange={this.onChange}
                                                            value={this.state.vision}
                                                        />
                                                    </InputGroup>
                                                    <Button
                                                        className="btn-icon mb-3 mb-sm-0 login-button"
                                                        color="warning"
                                                        type="submit"
                                                        style={{ marginTop: '2em', display: 'block', float: 'right' }}
                                                    >
                                                        <span className="btn-inner--text" >Post</span>
                                                    </Button>
                                                </FormGroup>

                                            </form>


                                        </div>
                                        <br /><br /><br />
                                        {this.state.isSearch ? (<>
                                            <h4 className="text-white">Top 3 matches:</h4>
                                            {/* <Link to='/dashboard'> */}
                                            <button
                                                    key={this.state.top3Result[0]._id}
                                                    className='search-results'
                                                    onClick={() => {
                                                        this.setState(prevState => ({
                                                            myTutor: this.state.top3Result[0]._id,
                                                            testCreated: [...prevState.testCreated, this.state.top3Result[0].org1TestCreated]

                                                        }), () => {
                                                            this.setTutor()
                                                        })
                                                    }}>
                                                    <span style={{ fontSize: '1em' }}><b>{this.state.top3Result[0].org1Name}</b></span><br />
                                                    <span style={{ fontSize: '.7em' }}><i>Match Score:<b>{this.state.top3Result[0].org1Score}</b></i></span>
                                            </button>
                                            <button
                                                    key={this.state.top3Result[1]._id}
                                                    className='search-results'
                                                    onClick={() => {
                                                        this.setState((prevState) => ({
                                                            myTutor: this.state.top3Result[1]._id,
                                                            testCreated: [...prevState.testCreated, this.state.top3Result[0].org1TestCreated]
                                                        }), () => {
                                                            this.setTutor()
                                                        })
                                                    }}>
                                                    <span style={{ fontSize: '1em' }}><b>{this.state.top3Result[1].org2Name}</b></span><br />
                                                    <span style={{ fontSize: '.7em' }}><i>Match Score:<b>{this.state.top3Result[1].org2Score}</b></i></span>
                                            </button>
                                            <button
                                                    key={this.state.top3Result[2]._id}
                                                    className='search-results'
                                                onClick={() => {
                                                    this.setState((prevState) => ({
                                                        myTutor: this.state.top3Result[1]._id,
                                                        testCreated: [...prevState.testCreated, this.state.top3Result[2].org1TestCreated]
                                                    }), () => {
                                                        this.setTutor()
                                                    })
                                                }}>
                                                    <span style={{ fontSize: '1em' }}><b>{this.state.top3Result[2].org3Name}</b></span><br />
                                                    <span style={{ fontSize: '.7em' }}><i>Match Score:<b>{this.state.top3Result[2].org3Score}</b></i></span>
                                                </button>
                                        </>) : <></>}


                                        <hr style={{ backgroundColor: 'white' }} />
                                        <Button
                                            className="btn-icon mb-3 mb-sm-0 login-button"
                                            color="warning"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                this.setState({
                                                    moreSearch: true
                                                })
                                            }}
                                            style={{ marginTop: '2em', display: 'block', textAlign: 'center', margin: 'auto' }}
                                        >
                                            <span className="btn-inner--text" >Fetch more matches</span>
                                        </Button><br /><br />
                                        {this.state.moreSearch ?
                                            this.state.otherResult.map((e) => (
                                                // <Link to='/dashboard'>
                                                    <button
                                                        key={e._id}
                                                        className='search-results'
                                                        onClick={() => {
                                                            this.setState(prevState => ({
                                                                myTutor: e._id,
                                                                testCreated: [...prevState.testCreated, e.testCreated]
                                                            }), () => {
                                                                    this.setTutor()
                                                            })
                                                        }}>
                                                        <span style={{ fontSize: '1em' }}><b>{e.name}</b></span><br />
                                                </button>
                                            )) : <></>
                                        }


                                    </section>
                                </Col>
                                <Col md='6'>
                                    <div className="center-item">
                                        <img
                                            alt="..."
                                            className="img-fluid img-searchFaculty"
                                            src={require("./../assets/img/professor.png")}
                                            style={{ height: '30em' }}
                                        />
                                    </div>
                                </Col>
                            </Row>

                        </Container>
                    </section>
                </div>
                <Footer />

            </>
        )
    }
}
SearchFaculty.propTypes = {
    auth: PropTypes.object.isRequired,
    tutor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    tutor: state.tutor
})

export default connect(mapStateToProps, { setPreferred, setMyTutor })(SearchFaculty);