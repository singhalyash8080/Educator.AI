import React, { Component } from "react";
import LearnCards from "./learn-cards.component";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class Learn extends Component {
  render() {
    return (
      <>
        <div>
          <span className="center-item" style={{ fontSize: "1.5em" }}>
            Let's get started with our learning today!
          </span>
        </div>
        <div style={{ marginTop: "2em" }}>

            <LearnCards />

        </div>
      </>
    );
  }
}

Learn.propTypes = {
  auth: PropTypes.object.isRequired,
  tutor: PropTypes.object.isRequired

}
const mapStateToProps = state => ({
  auth: state.auth,
  tutor: state.tutor
})
export default connect(
  mapStateToProps
)(Learn);
