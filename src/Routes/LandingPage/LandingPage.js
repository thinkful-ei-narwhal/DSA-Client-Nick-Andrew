import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import dogs from './dogs.jpg'
import './LandingPage.css'
class LandingPage extends Component {
  render() {
    return (
      <div>
        <h3 className="tagLine">Welcome To Our Adoption Site!</h3>
        <img className="dogPic" src={dogs} alt="Logo" />
        <span className="adoptPageBtn">
          <Link
            to='/adoption'>
            Adopt A Pet
          </Link>
        </span>
      </div>
    )
  }
}

export default LandingPage
