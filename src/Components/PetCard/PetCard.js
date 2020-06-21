import React, { Component } from 'react'
import './PetCard.css'

export class PetCard extends Component {
  render() {
    const { age, breed, imageDescription, imageURL, name, sex, story } = this.props.pet
    return (
      <article className="petCard">
        <h2 className="petDetails">{name}</h2>
        <img src={imageURL} alt={imageDescription} />
        <p className="petDetails">Age: {age}</p>
        <p className="petDetails">Sex: {sex}</p>
        <p className="petDetails">Breed: {breed}</p>
        <p className="petDetails">{name}'s Story: {story}</p>
      </article>
    )
  }
}

export default PetCard
