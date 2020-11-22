import React from "react";
import { Question } from "../containers/question";
import "../styles/QuestionList.css";
export class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  

  render() {
    let rows = [];

    let rowDel = this.props.onRowDel;
    let onRowAdd = this.props.onRowAdd;
    let onRowSave = this.props.onRowSave;

    this.props.questions.forEach(function (question) {
      rows.push(
        <Question
          question={question}
          onDelEvent={rowDel}
          onRowSave={onRowSave}
          key={question._id}
        />
      );
    });
    // var emptyQuestion = { _ids: "", _id: "", question: "", options: "", correct: "" };
    rows.push(
      <Question
        question=''
        newMode={true}
        key="newQuestion"
        onRowAdd={onRowAdd}
      />
    );
    return (
      <div className="question-list">



        <table className="table-list">
          <thead className="table-head">
            <tr style={{ textAlign: 'center' }}>
              <th>
                <span
                  name="_id"
                // onClick={onColumnSort}
                >
                  {" "}

                  Question ID{" "}
                </span>
              </th>
              <th>
                <span
                  name="ques"
                // onClick={onColumnSort}
                >
                  {" "}
                  Question{" "}
                </span>
              </th>
              <th>
                <span
                  name="options"
                // onClick={onColumnSort}
                >
                  {" "}
                  Option{" "}
                </span>
              </th>
              <th>
                <span
                  name="ans"
                // onClick={onColumnSort}
                >
                  {" "}
                  Answer{" "}
                </span>
              </th>
              <th className="LastColumn" />
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}
