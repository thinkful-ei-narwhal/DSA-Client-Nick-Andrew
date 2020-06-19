import React, { Component } from 'react'
import "./AdoptButton.css"

export class AdoptButton extends Component {
  render() {
    return (
      <button onClick={() => this.props.executeAdoption(this.props.type, this.props.person)}>Adopt Me!</button>
    )
  }
}

export default AdoptButton
