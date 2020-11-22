import React, { Component } from "react";
import Navbar1 from "./navbar";
import { Container, Button } from "reactstrap";
import Footer from "./footer";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { backendURL } from "../utils/backURL";
import _ from 'lodash'

class Exam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userAnswer: null,
      currentQuestion: 0,
      options: [],
      questions: [],
      QuizData: [],
      setAns: [],
      selectedAns: [],
      ansSaved: false,
      disableNext: false,
      loading: false
    }
  }

  loadQuestions() {
    const { location } = this.props
    axios
      .post(`${backendURL}/test/users/takeTest`, {
        "testId": `${location.query.accessKey}`,
        "token": `${localStorage.getItem('jwtToken').split(" ")[1]}`
      })
      .then((res) => {
        this.setState({
          QuizData: res.data.questionSet
        });
        const { currentQuestion, QuizData } = this.state;
        this.setState(() => {
          return {
            quid: QuizData[currentQuestion].quid,
            questions: QuizData[currentQuestion].ques,
            options: QuizData[currentQuestion].options,
          };
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  saveAnswers() {
    const { selectedAns } = this.state
    this.setState({
      setAns: _.uniqBy(selectedAns, '_id')
    })
  }
  nextQuestionHandler = () => {
    const { QuizData } = this.state;
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    }, () => {
      if (this.state.currentQuestion === QuizData.length - 1) {
        this.setState({
          nextDisable: true
        })
      }
        if (this.state.currentQuestion > QuizData.length - 1) {
        this.setState({
          currentQuestion: QuizData.length - 1,

        })
      }
    });
  };
  componentDidUpdate(prevProps, prevState) {
    const { QuizData } = this.state;
    const { currentQuestion } = this.state;
    if (this.state.currentQuestion !== prevState.currentQuestion && this.state.currentQuestion >= 0) {
      if (this.state.currentQuestion < QuizData.length) {
        this.setState(() => {

          return {
            questions: QuizData[currentQuestion].ques,
            options: QuizData[currentQuestion].options,
          }
        });
      }
      else {
        this.setState(() => {

          return {
            questions: QuizData[QuizData.length - 1].ques,
            options: QuizData[QuizData.length - 1].options,
          }
        })
      }
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0)
    this.loadQuestions();
  }

  render() {
    const { user } = this.props.auth
    const { location } = this.props
    const { questions, options, currentQuestion, QuizData, selectedAns, setAns, ansSaved, disableNext, loading } = this.state
    console.log(location.query.accessKey)
    return (
      <>
        <Navbar1 />

        <div className="main-content" style={{ backgroundColor: '#5545bf' }}>
          <section className="section section-lg section-hero section-exam">
            <div className="shape shape-style-1 shape-default"></div>
            <Container>
              <section className="section section-shaped">
                <div className="center-item">
                  <h1 className="display-3 text-white">Exam Topic</h1>
                </div>
              </section>
              <div className="exam-area">
                <div className="exam-question center-item">
                  <span className="question text-white">
                    {`${currentQuestion + 1}`}.{questions}
                  </span>
                </div>
                <center>
                  <div
                    className="grid"
                    style={{ marginTop: "2em", width: "70%" }}
                  >

                    {options.map((option) => (
                      <button
                        key={option.id}
                        className="quiz"
                        onClick={() => {
                          this.setState(prevState =>
                            ({
                              selectedAns: [{ "_id": `${QuizData[currentQuestion].quid}`, "ans": option }, ...prevState.selectedAns],
                              ansSaved: false
                            })

                          );
                        }}
                      

                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </center>
              </div>
              <div
                className="submit-area"
                style={{ textAlign: "right", marginTop: "5em" }}
              >
                {/* <Link to={{
                  pathname: '/result',
                  // query: {
                  //   marks: this.state.sampleRes

                  // }
                }}>


                <Button className="py-2" color="warning">
                    Continue
                </Button>
                </Link> */}
                <Button
                  className="my-4"
                  type="button"

                  onClick={this.nextQuestionHandler}
                  disabled={disableNext}
                >
                  Next
                    </Button>

                {ansSaved ? <Button
                  className="my-4"
                  style={{
                    backgroundColor: "#b2102f",
                    color: "white",

                  }}
                  type="button"

                  onClick={
                    () => {
                      this.setState({
                        loading: true
                      })
                      axios
                        .post(`${backendURL}/test/users/submitTest`, {
                          "testId": `${location.query.accessKey}`,
                          "name": `${user.name}`,
                          "email": `${user.email}`,
                          'ans': setAns,
                          'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`
                        }).then(() => {
                          this.props.history.push({
                            pathname: '/result',
                            state: {
                              key: location.query.accessKey,
                              totalMarks: QuizData.length
                            }
                          })

                        }).catch((err) => {
                          console.log(err)
                        })

                    }
                  }

                >
                  {loading && (
                    <i
                      className="fa fa-refresh fa-spin"
                      style={{ marginRight: "5px" }}
                    />
                  )}
                  {loading && <span>Finish</span>}
                  {!loading && <span>Finish</span>}
                </Button> : <Button
                  className="my-4"

                  type="button"

                  onClick={() => {
                    this.setState({
                      setAns: _.uniqBy(selectedAns, '_id'),
                      ansSaved: true
                    })
                  }}
                >
                    Save Answers
                    </Button>}



              </div>
            </Container>
          </section>
        </div>
        <Footer /> 
      </>
    );
  }
}

Exam.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(Exam);
