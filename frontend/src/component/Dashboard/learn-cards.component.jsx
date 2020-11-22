import React, { Component } from "react";
import { Card, CardBody, Modal, Button } from "reactstrap";
import { BrowserRouter, Switch, Link } from 'react-router-dom'
import { connect } from "react-redux";
import PropTypes from "prop-types";
class LearnCards extends Component {
  state = {
    key: ''
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value

    })
  }
  toggle = state => {
    this.setState({
      [state]: !this.state[state]
    })
  }
  constructor(props) {
    super(props);
    this.state = {
      isTeacher: false

    }
  }
  teacherCheck() {
    const { user } = this.props.auth
    if (user.teacherName) {
      this.setState({
        isTeacher: true
      })
    }
  }
  componentDidMount() {
    this.teacherCheck();
  }
  render() {
    const { myTutor } = this.props.tutor
    // console.log(myTutor);
    // console.log(myTutor.testCreated);
    // console.log(myTutor.testCreated[0][0]);



    return (
      <div>
        
        {this.state.isTeacher ? (<> </>) : myTutor.testCreated[0].map((e) => (
          <>
            <Card
              style={{
                backgroundColor: "#FDB813",
                borderRadius: "1em",
              }}
            >
              <CardBody>
                <span className="text-white card-txext">Exam</span>
                <div className="start-exam"><i className='fa fa-play text-white' onClick={() => this.toggle('accessKey')}></i></div>
              </CardBody>
            </Card><br /><br />
              <Modal
                className='modal-dialog-centered'
                isOpen={this.state.accessKey}
                toggle={() => this.toggle('accessKey')}

              >
                <div className="modal-header access-modal">
                  <h6 className="modal-title" id="modal-title-default">
                  Exam Confirmation
                </h6>
                  <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => this.toggleModal("accessKey")}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                </div>
                <div className="modal-body access-modal">
                  <p>
                  You are about the access the exam
                </p>

                </div>
                <div className="modal-footer access-modal">
                  <BrowserRouter>
                    <Switch>

                    </Switch>
                  </BrowserRouter>
                  <Link to={{
                    pathname: '/main-exam',
                    query: {
                      accessKey: e
                    }
                  }}>
                    <Button color="primary" type="button">
                    Take Test
                </Button>
                  </Link>
                  <Button
                    className="ml-auto"
                    color="link"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => this.toggle("accessKey")}
                  >
                    Close
                </Button>
                </div>
              </Modal>

          </>
        ))}


      </div>
    );
  }
}
LearnCards.propTypes = {
  auth: PropTypes.object.isRequired,
  tutor: PropTypes.object.isRequired

}
const mapStateToProps = state => ({
  auth: state.auth,
  tutor: state.tutor
})
export default connect(
  mapStateToProps
)(LearnCards);

