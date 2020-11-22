import React, { Component } from "react";
import { Link } from "react-router-dom";
import { InputGroup, InputGroupAddon, Input, FormGroup, InputGroupText, Button } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { registerTeacher } from '../actions/authActions'
class RegisterTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            course: '',
            vision: '',
            demoVideo: '',
            errors: {}
        }
    }
    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    onChangeRole = e => {
        this.setState({
            role: e.target.id
        })
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.auth.isAuth) {
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuth) {
            this.props.history.push('/dashboard')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            teacherName: this.state.name,
            email: this.state.email,
            password: this.state.password,
            vision: this.state.vision,
            course: this.state.course
        }
        this.props.registerTeacher(userData, this.props.history)
    }

    render() {
        const { errors } = this.state
        return (
            <>
                <div className="main-login-container">
                    <div className="login-container">

                        <form className='login-form-control' onSubmit={this.onSubmit} noValidate>
                            <div className="logo-container">
                                <Link to='/'>
                                    <img
                                        alt="..."
                                        className="img-fluid"
                                        src={require("./../assets/logo.svg")}
                                        style={{ height: "3em" }}
                                    />
                                </Link>
                                <h2 className="login-header">
                                    Register new account
                </h2>
                            </div>
                            <FormGroup style={{ paddingRight: '1em' }}

                            >
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-user" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Name"
                                        type="text"
                                        id="name"
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        error={errors.teacherName}



                                    />
                                </InputGroup>
                                <span
                                    className="red-text"
                                    style={{
                                        color: "orange",
                                    }}
                                >
                                    {errors.teacherName}

                                </span>
                                <br />
                                <InputGroup className="input-group-alternative" style={{ marginTop: '1em' }}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-user" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Email"
                                        type="text"
                                        id="email"
                                        onChange={this.onChange}
                                        value={this.state.email}
                                        error={errors.email}


                                    />
                                </InputGroup>
                                <span
                                    className="red-text"
                                    style={{
                                        color: "orange",
                                    }}
                                >
                                    {errors.email}

                                </span>
                                <br />

                                <InputGroup className="input-group-alternative" style={{ marginTop: '1em' }}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        id="password"
                                        onChange={this.onChange}
                                        value={this.state.password}
                                        error={errors.password}
                                    />
                                </InputGroup>
                                <span
                                    className="red-text"
                                    style={{
                                        color: "orange",
                                    }}
                                >
                                    {errors.password}

                                </span>
                                <br />

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
                                        error={errors.course}
                                />
                                </InputGroup>
                                <span
                                    className="red-text"
                                    style={{
                                        color: "orange",
                                    }}
                                >
                                    {errors.course}

                                </span>
                                <br />
                                <InputGroup className="input-group-alternative" style={{ marginTop: '1em' }}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-user" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Vision"
                                        type="textarea"
                                        id="vision"
                                        onChange={this.onChange}
                                        value={this.state.vision}
                                        error={errors.vision}
                                />
                                </InputGroup>
                                <span
                                    className="red-text"
                                    style={{
                                        color: "orange",
                                    }}
                                >
                                    {errors.vision}

                                </span>
                                <br />
                                <InputGroup className="input-group-alternative" style={{ marginTop: '1em' }}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-user" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Demo Video (optional)"
                                        type="text"
                                        id="demoVideo"
                                        onChange={this.onChange}
                                        value={this.state.demoVideo}
                                        error={errors.demoVideo}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <Button
                                className="btn-icon mb-3 mb-sm-0 login-button"
                                color="primary"
                                type='submit'
                            >
                                <span className="btn-inner--text">Register</span>
                            </Button>

                            <hr style={{ backgroundColor: 'grey', width: '100%' }} />
                            <div className="sigun-up-text">
                                <span>Already have an account?</span><br /><br />
                                <Link to='/loginTeacher'>
                                    <span>Sign In</span>
                                </Link>
                            </div>

                            <div className="additional-text">
                                <span><i>Where learning is fun</i></span>
                            </div>

                        </form>
                    </div>
                    <div className="login-bg-container">
                    </div>
                </div>
            </>
        );
    }
}

RegisterTeacher.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(
    mapStateToProps,
    { registerTeacher }
)(RegisterTeacher);
