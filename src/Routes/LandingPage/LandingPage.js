import React, { Component } from "react";
import { Link } from "react-router-dom";
import dogs from "./dogs.jpg";
import "./LandingPage.css";
class LandingPage extends Component {
  render() {
    return (
      <div>
        <h3 className="tagLine">Welcome To Our Adoption Site!</h3>
        <p className="tagLine-subtext">
          Petful is a place for pet lovers to adopt their new pets. Our mission
          is to help the animals first and find them a home. People that enter
          the queue are given a choice of cat of dog to adopt. You get to see
          both animals and then make your choice on which is the right one for
          you!
        </p>
        <img className="dogPic" src={dogs} alt="Logo" />
        <Link className="adoptPageBtn" to="/adoption">
          Adopt A Pet
        </Link>
      </div>
    );
  }
}

export default LandingPage;
