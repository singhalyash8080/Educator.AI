import React, { Component } from "react";
import { Link } from "react-router-dom";
import { InputGroup, InputGroupAddon, Input, FormGroup, InputGroupText, Button } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { login } from '../actions/authActions'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    }
  }
  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.login(userData);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.auth.isAuth) {
      this.props.history.push('/searchFaculty');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuth) {
      this.props.history.push('/searchFaculty')
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }
  render() {
    const { errors } = this.state
    return (
      <>
        <div className="main-login-container">
          <div className="login-container">

            <form className='login-form-control' noValidate onSubmit={this.onSubmit}>
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
                  Login to your account
                </h2>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
              <FormGroup style={{ paddingRight: '1em' }}

              >
                <InputGroup className="input-group-alternative">
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
                  </InputGroup><br />
                  <span
                    style={{
                      color: "orange",
                    }}
                  >
                    {errors.email}
                    {errors.emailNotFound}
                  </span><br />
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
                  </InputGroup><br />
                  <span
                    className="red-text"
                    style={{
                      color: "orange",
                    }}
                  >
                    {errors.password}
                    {errors.passwordIncorrect}
                  </span>
                  <br />
                </FormGroup>

              <Button
                className="btn-icon mb-3 mb-sm-0 login-button"
                color="primary"
                  type="submit"
              >
                <span className="btn-inner--text">Login</span>
                </Button>
              </form>
              <hr style={{ backgroundColor: 'grey', width: '100%' }} />
              <div className="sigun-up-text">
                <span>Don't have an account?</span><br /><br />
                <Link to='/register'>

                  <span>Sign up</span>
                </Link>

              </div>

              <div className="additional-text">
                <span><i>Where learning is fun</i></span>
              </div>

            </form>
          </div>
          <div className="login-bg-container">
            <div className="login-bg-image">
              {/* <img
                alt="..."
                className="img-fluid"
                src={require("./../assets/img/login-bg.svg")}
                style={{ height: '20em' }}
              /> */}
            </div>
          </div>
        </div>
  </>
    );
  }
}
Login.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(
  mapStateToProps,
  { login }
)(Login);

