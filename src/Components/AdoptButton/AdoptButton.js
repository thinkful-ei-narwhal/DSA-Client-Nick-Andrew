import React, { Component } from "react";
import "./AdoptButton.css";

export class AdoptButton extends Component {
  render() {
    return (
      <button
        className="adoptBtn"
        onClick={() => this.props.executeAdoption(this.props.type, true)}
      >
        Adopt Me!
      </button>
    );
  }
}

export default AdoptButton;
