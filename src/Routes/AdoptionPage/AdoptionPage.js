import React, { Component } from 'react'
import PetfulApiService from '../../services/petful-api-services'

// components
import PetCard from '../../components/PetCard/PetCard'
import HumanCard from '../../components/HumanCard/HumanCard'


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
    PetfulApiService.getCats()
      .then(data => {
        this.setState({ cats: data})
      })
      .catch(error => {
        this.setState({ error: error })
      })

    PetfulApiService.getDogs()
    .then(data => {
      this.setState({ dogs: data})
    })
    .catch(error => {
      this.setState({ error: error })
    })

    PetfulApiService.getPeople()
      .then(data => {
        this.setState({ people: data})
      })
      .catch(error => {
        this.setState({ error: error })
      })
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
