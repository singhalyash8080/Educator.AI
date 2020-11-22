import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Row, FormGroup, Input, InputGroup, Button, Card, CardBody } from "reactstrap";
import axios from "axios";
import { backendURL } from '../../utils/backURL'
import { NotificationContainer, NotificationManager } from 'react-notifications';

class Resources extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resourceName: '',
            resourceText: '',
            resources: []
        }

    }
    onLoad() {
        const { user } = this.props.auth
        axios
            .post(`${backendURL}/test/orgs/viewResources`, {
                "teacherId": user._id,
                'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`

            })
            .then((res) => {
                this.setState({
                    resources: res.data.resources
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
            .post(`${backendURL}/test/orgs/addResources`, {
                'email': user.email,
                'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`,
                'resName': this.state.resourceName,
                'resText': this.state.resourceText
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
        const { resources } = this.state
        return (
            <>
                <div>
                    <span className="center-item" style={{ fontSize: "1.5em" }}>
                        Provide useful resources to the young minds
          </span>
                </div>
                <div style={{ marginTop: "2em" }}>
                    <Row>
                        <Col>
                            <form noValidate onSubmit={this.onSubmit}>
                                <span className="center-item" style={{ fontSize: "1em" }}>
                                    Resource Name
                      </span>
                                <FormGroup style={{ paddingRight: '1em' }}>
                                    <InputGroup className="input-group-alternative">
                                        <Input
                                            placeholder="Name"
                                            type="text"
                                            id="resourceName"
                                            onChange={this.onChange}
                                            value={this.state.resourceName}
                                        />
                                    </InputGroup><br />
                                    <span className="center-item" style={{ fontSize: "1em" }}>
                                        Resource Content
                      </span>
                                    <InputGroup className="input-group-alternative">
                                        <Input
                                            placeholder="Text"
                                            type="textarea"
                                            id="resourceText"
                                            onChange={this.onChange}
                                            value={this.state.resourceText}
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
                            {resources.map((e) => (
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

Resources.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(Resources);