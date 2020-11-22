import React, { Component } from "react";
import QuestionHolder from '../questions/containers/main';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { backendURL } from '../../utils/backURL'
import axios from 'axios'
import { Input, Button, FormGroup, InputGroup, Card, CardBody } from 'reactstrap'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Col, Row } from 'reactstrap'
class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            testName: '',
            testIds: [],
            id: ''
        }
    }
   

    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    viewTestList = e => {
        const { user } = this.props.auth
        axios
            .post(`${backendURL}/test/orgs/viewTestList`, {
                "email": `${user.email}`,
                "token": `${localStorage.getItem('jwtToken').split(" ")[1]}`
            })
            .then((res) => {
                console.log(res.data)
                this.setState({
                    testIds: res.data

                })
            })
    }
    onSubmit = e => {
        const { user } = this.props.auth
        e.preventDefault()
        axios
            .post(`${backendURL}/test/orgs/addTest`, {
                "testName": this.state.testName,
                "teacherId": `${user._id}`,
                "text": this.state.text,
                "maxMarks": 5,
                'perQuestionMarks': 1,
                "negativeMarks": 0,
                "token": `${localStorage.getItem('jwtToken').split(" ")[1]}`,

            }).then(() => {
                NotificationManager.success('Success message', 'Test has been successfully created');

            })
            .catch(() => {
                NotificationManager.error('Operation failed', 'Test could not be created');
        })
    }


    render() {

        return (
            <>
                <span className="center-item" style={{ fontSize: "1.5em" }}>
                    Upload the content to prepare the questions
          </span>

                <form className='login-form-control' noValidate onSubmit={this.onSubmit}>
                    <FormGroup style={{ paddingRight: '1em' }}>
                        <InputGroup className="input-group-alternative">
                            <Input
                                placeholder="Test Name"
                                type="text"
                                id="testName"
                                onChange={this.onChange}
                                value={this.state.testName}
                            />
                        </InputGroup><br />
                        <InputGroup className="input-group-alternative" >
                            <Input
                                placeholder="Put your text here"
                                type="textarea"
                                id="text"
                                onChange={this.onChange}
                                value={this.state.text}
                            />


                        </InputGroup>
                    </FormGroup>
                    <Button
                        className="btn-icon mb-3 mb-sm-0 login-button"
                        color="primary"
                        type='submit'
                    >
                        <span className="btn-inner--text">Upload</span>
                    </Button>
                </form>
                <div className="center-item">
                    <div style={{ backgroundColor: 'success', color: 'white' }} className='text-white'> <NotificationContainer /></div>

                </div>
                <Row>
                    <Col lg='12'>
                        <span className="center-item" style={{ fontSize: "1.5em", marginBottom: '2em' }}>
                            View all the Tests created
          </span><br /><br />
                        <span style={{ display: 'block', marginBottom: '2em' }}>
                            You can view all the test created on our platform to manage and edit as per your convenience.
                        </span>
                        <Button
                            className="btn-icon mb-3 mb-sm-0 login-button"
                            color="primary"
                            onClick={() => this.viewTestList()}
                            style={{ marginTop: '2em', display: 'block' }}
                        >
                            <span className="btn-inner--text" >View Test List</span>
                        </Button>
                    </Col>



                </Row>
                {this.state.testIds.map((e) => (
                    <>
                        <br />
                        <Card style={{ backgroundColor: "#FDB813", borderRadius: "1em", cursor: 'pointer' }} onClick={() => {
                            this.setState({
                                id: e._id
                            })
                        }}>
                            <CardBody>
                                <span className="text-white card-text">{e.testName}</span>
                            </CardBody>
                        </Card><br /><br />
                    </>
                    // <div className='test-id-container' style={{ padding: '2em' }}>
                    //     <ul>
                    //         <li>{e}</li>
                    //     </ul>
                    // </div>

                ))}      


                <div className="manual-questions" style={{ marginTop: '2em', marginBottom: '2em' }}><QuestionHolder testId={this.state.id} /></div>

            </>
        )
    }
}

Manage.propType = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(
    mapStateToProps
)(Manage);
