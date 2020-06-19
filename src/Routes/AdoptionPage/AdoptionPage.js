import React, { Component } from 'react'

class AdoptionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
      dogs: [],
      peoples: [],
      error: null,
    }
  }

  componentDidMount() {
    
  }



  render() {
    return (
      <>
        <nav/>
        <div>
          <p>Welcome to Our Adoption Page</p>
        </div>
      </>
    )
  }
}

export default AdoptionPage
