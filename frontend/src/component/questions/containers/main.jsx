import React from "react";
import axios from "axios";
import { QuestionList } from "../components/questionList";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { backendURL } from '../../../utils/backURL'
import { Input, InputGroup, Button, FormGroup } from 'reactstrap' 
class QuestionHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.testId,
      submit: false
    };
    this.state.questions = [];
    this.state.shownQuestions = this.state.questions;
    this.state.filter = {
      _id: "",
      question: "",
      options: "",
      correct: ""
    };
    this.state.activeSort = "0";

    this.handleRowDel = this.handleRowDel.bind(this);
    this.handleRowAdd = this.handleRowAdd.bind(this);
    this.handleRowSave = this.handleRowSave.bind(this);
  }
  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleRowDel(question) {
    let index = this.state.questions.indexOf(question);
    let questions = this.state.questions;

    questions.splice(index, 1);
    let shownQuestions = questions
    console.log(this.state.id)


    // Delete on API

    axios
      .post(`${backendURL}/test/orgs/delQuestions/` + question._id, {
        'testId': `${this.state.id || this.props.testId}`,
        'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`
      })
      .then(
        this.setState({
          questions: questions,
          shownQuestions: shownQuestions
        })
      )
      .catch(err => {
        JSON.stringify(err.config);
      });
  }

  handleRowAdd(question) {
    // Create on API
    axios
      .post(`${backendURL}/test/orgs/addQuestions`, {

        'testId': `${this.state.id || this.props.testId}`,
        'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`,
        'question': {
          '_id': question._id,
          'question': question.question,
          'options': question.options.split(','),
          'correct': question.correct,
        }




      })
      .then(res => {
        question._ids = res.data._id;
      })
      .catch(err => {
        console.log(err)
      });

    // Update State and the data shown filtered/sorted
    let questions = this.state.questions;
    questions.push(question);

    let shownQuestions = questions



    this.setState({
      questions: questions,
      shownQuestions: shownQuestions
    });
  }

  handleRowSave(question) {
    // Update on API
    axios
      .put(`${backendURL}/test/orgs/questions/` + question._id, {

        'testId': `${this.state.id || this.props.testId}`,
        'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`,
        'question': {
          '_id': question._id,
          'question': question.question,
          'options': question.options,
          'correct': question.correct,
        }
      })
      .then()
      .catch(err => {
        console.log(err.response);
      });
  }

  handleFilterChange(evt) {
    let filters = this.state.filter;
    filters[evt.target.name] = evt.target.value;

    let shownQuestions = this.state.questions.filter


    this.setState({ filter: filters, shownQuestions: shownQuestions });
  }

  onSubmitId = e => {
    e.preventDefault();
    axios
      .post(`${backendURL}/test/orgs/questions/${this.state.id || this.props.testId}`, {
        "token": `${localStorage.getItem('jwtToken').split(" ")[1]}`
      }).then(res => {
        let shownQuestions = res.data.questions

        this.setState({
          questions: res.data.questions,
          shownQuestions: shownQuestions
        });
      }).catch(err => {
        console.log("API GET : Error " + err.response);
      });
  }


  // Lifecycle Methods
  // componentDidMount() {
    //   // Read All on API
    //   axios
    //     .post(`${backendURL}/api/post/orgs/viewQuestions`, {
    //       'clubCode': `${org.clubCode}`,
    //       'testId': `${org.testId}`,
    //       'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`
    //     })
    //     .then(res => {

    //       let shownQuestions = res.data

    //       this.setState({
    //         questions: res.data,
    //         shownQuestions: shownQuestions
    //       });
    //     })
    //     .catch(err => {
    //       console.log("API GET : Error " + err.response);
    //     });
  // }
  // componentDidUpdate(prevProps, PrevState) {
  //   if (PrevState.submit !== this.state.submit) {
  //     axios
  //       .post(`${backendURL}/test/orgs/questions/${this.state.id}`, {
  //         "token": `${localStorage.getItem('jwtToken').split(" ")[1]}`
  //       }).then(res => {
  //         let shownQuestions = res.data         

  //         this.setState({
  //           questions: res.data,
  //           shownQuestions: shownQuestions
  //         });
  //       }).catch(err => {
  //         console.log("API GET : Error " + err.response);
  //       });
  //   }
  // }
  


  render() {

    return (
      <>
        <h4>Manual Question Entry</h4>

        <span>Looking for already existing test?.Please enter the Test ID below</span>

        <form className='login-form-control' noValidate onSubmit={this.onSubmitId}>
          <FormGroup>
            <InputGroup className="input-group-alternative">
              <Input
                placeholder="Test ID"
                type="text"
                id="id"
                onChange={this.onChange}
                value={this.state.id || this.props.testId}
              />
            </InputGroup>
          </FormGroup>
          <Button
            className="btn-icon mb-3 mb-sm-0 login-button"
            color="primary"
            type='submit'
            onClick={() => {
              this.setState({
                submit: !this.state.submit
              })
            }}
          >
            <span className="btn-inner--text">Search</span>
          </Button>
        </form>
      <div style={{ overflowX: 'scroll' }}>
        <QuestionList
          questions={this.state.shownQuestions}
          filterValue={this.state.filter}
          onRowDel={this.handleRowDel}
          onRowAdd={this.handleRowAdd}
          onRowSave={this.handleRowSave}
          onFilterChange={this.handleFilterChange}
          /></div>
      </>
    );
  }
}

QuestionHolder.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(QuestionHolder)
