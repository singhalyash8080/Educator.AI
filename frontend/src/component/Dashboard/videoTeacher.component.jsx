import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Row, FormGroup, Input, InputGroup, Button, Card, CardBody } from "reactstrap";
import axios from "axios";
import { backendURL } from '../../utils/backURL'
import { NotificationContainer, NotificationManager } from 'react-notifications';

class VideoTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoName: '',
            videoText: '',
            videos: []
        }

    }
    onLoad() {
        const { user } = this.props.auth
        axios
            .post(`${backendURL}/test/orgs/viewVideos`, {
                "teacherId": user._id,
                'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`

            })
            .then((res) => {
                this.setState({
                    videos: res.data.videos
                })
            })

    }
    onChange = e => {
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    onSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth
        axios
            .post(`${backendURL}/test/orgs/addVideos`, {
                'email': user.email,
                'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`,
                'resName': this.state.videoName,
                'resText': this.state.videoText
            })
            .then(() => {
                NotificationManager.success('Success message', 'Resource has been successfully created');
            })
            .catch(() => {
                NotificationManager.error('Operation failed', 'Resource could not be created');

            })
    }
    componentDidMount() {
        this.onLoad();
    }
    render() {
        const { videos } = this.state
        return (
            <>
                <div>
                    <span className="center-item" style={{ fontSize: "1.5em" }}>
                        Videos that make things understand in a better way
          </span>
                </div>
                <div style={{ marginTop: "2em" }}>
                    <Row>
                        <Col>
                            <form noValidate onSubmit={this.onSubmit}>
                                <span className="center-item" style={{ fontSize: "1em" }}>
                                    Video Name
                      </span>
                                <FormGroup style={{ paddingRight: '1em' }}>
                                    <InputGroup className="input-group-alternative">
                                        <Input
                                            placeholder="Name"
                                            type="text"
                                            id="videoName"
                                            onChange={this.onChange}
                                            value={this.state.videoName}
                                        />
                                    </InputGroup><br />
                                    <span className="center-item" style={{ fontSize: "1em" }}>
                                        Video Content
                      </span>
                                    <InputGroup className="input-group-alternative">
                                        <Input
                                            placeholder="Text"
                                            type="textarea"
                                            id="videoText"
                                            onChange={this.onChange}
                                            value={this.state.videoText}
                                        />


                                    </InputGroup>
                                </FormGroup>
                                <Button
                                    className="btn-icon mb-3 mb-sm-0 login-button"
                                    color="primary"
                                    type='submit'
                                    style={{ marginTop: '2em', display: 'block' }}
                                >
                                    <span className="btn-inner--text" >Post</span>
                                </Button></form>
                            <div style={{ backgroundColor: 'success', color: 'white' }} className='text-white'> <NotificationContainer /></div>
                            <br />
                            {videos.map((e) => (
                                <Card
                                    style={{
                                        backgroundColor: "#9052ff",
                                        borderRadius: "1em",
                                        marginTop: '2em'
                                    }}
                                >
                                    <CardBody>
                                        <span className="text-white" style={{ fontWeight: 'bold', fontSize: '1.5em' }}>{e.name}</span><br />
                                        <span className="text-white" style={{ fontSize: '1em' }}>{e.text}</span><br />

                                    </CardBody>
                                </Card>
                            ))}





                        </Col>

                    </Row>
                </div>


            </>
        )
    }
}

VideoTeacher.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(VideoTeacher);