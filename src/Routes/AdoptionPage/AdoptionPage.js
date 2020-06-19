import React, { Component } from 'react'
import PetfulApiService from '../../services/petful-api-services'
import './AdoptionPage.css'

// components
import PetCard from '../../components/PetCard/PetCard'
import HumanCard from '../../components/HumanCard/HumanCard'
import AdoptButton from "../../components/AdoptButton/AdoptButton.js"

class AdoptionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cat: null,
      dog: null,
      people: [],
      error: null,
      initialized: false,
      user: "",
    }
  }

  executeAdoption = (pet, owner) => {
    let isCat;
    let petAdopted;
    let persons;

    const promise1 = pet === "cat" ?
      PetfulApiService.deleteCat()
        .then(data => {
          PetfulApiService.getCat().then(data => {
            isCat = true;
            return petAdopted = data;
          });
        })
      : PetfulApiService.deleteDog()
        .then(data => {
          PetfulApiService.getDog().then(data => {
            isCat = false;
            return petAdopted = data;
          });
        })

    const promise2 = PetfulApiService.deletePeople(owner)
      .then(data => {
        PetfulApiService.getPeople().then(data => {
          return persons = data;
        });
      })

    Promise.all([promise1, promise2]).then(() => {
      isCat ? this.setState({ cat: petAdopted, people: persons }) : this.setState({dog: petAdopted, people: persons})
    });
  }

  componentDidMount() {
    setInterval(this.intervalFunction(), 5000);

    let newState = {
      cat: null,
      dog: null,
      people: [],
      error: null,
      initialized: false,
      user: "",
    }
    const promise1 = PetfulApiService.getCat()
      .then(data => {
        newState.cat = data;
      })
      .catch(error => {
        this.setState({ error: error })
      })

    const promise2 = PetfulApiService.getDog()
    .then(data => {
      newState.dog = data;
    })
    .catch(error => {
      this.setState({ error: error })
    })

    const promise3 = PetfulApiService.getPeople()
      .then(data => {
        newState.people = data;
      })
      .catch(error => {
        this.setState({ error: error })
      })

    Promise.all([promise1, promise2, promise3]).then(() => {
      newState.initialized = true;
      this.setState(newState)
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  intervalFunction() {
    console.log('TESTING');
    //if this.state.user !== this.people[0] move the queue
    //otherwise stop, although leave the timer running
  }

onSubmitToQueue(e) {
  e.preventDefault();
  this.setState({ user: e.target.name.value });
  PetfulApiService.postPeople(e.target.name.value)
    .then(data => {
        PetfulApiService.getPeople().then(data => this.setState({people: data}));
    })
    .catch(error => {
      this.setState({ error: error })
  })
  return e.target.name.value = "";
}

  loadPage() {
    console.log('TESTING', this.state.people);
    console.log('User = ', this.state.user);
    return (
      <>
        <nav />

          <h1>Animals Available For Adoption</h1>
          <ul>
          {this.state.people.map((person,index ) => { 
            console.log('person', person);
            return <li key={index}>{person}</li>;
          })}
          </ul>

        <form onSubmit={(e) => this.onSubmitToQueue(e)}>
          <label>Name: <input type="text" name="name" /></label>
          <input type="submit" value="Submit" />
        </form>

          {/* Display list of people currently in line - Person object returning null, otherwise this works*/}
          {/* hide adopt button if name NOT in front - Todo, need to make a user state, and set it when a person adds themself to the line */}
          {/* 5 seconds, the user at the front of the line remove, select random pet */}
          {/* When user at front, make adopt button appear, stop the move queue timer */}
          {/* ONLY when user at front , generate random person at back of line every five seconds until line is 5, max 5 people */}

          {this.state.cat && <PetCard
            pet={this.state.cat}
          />}
          {this.state.people[0] === this.state.user ? <AdoptButton className="adoptBtn" executeAdoption={this.executeAdoption} type={"cat"} person={this.state.people[0]} /> : null}

          {this.state.dog && <PetCard
            pet={this.state.dog}
          />}
          {this.state.people[0] === this.state.user ? <AdoptButton className="adoptBtn" executeAdoption={this.executeAdoption} type={"dog"} person={this.state.people[0]} /> : null}

          <HumanCard />
     </>
    )
  }

  render() {
    return (
      <>{this.state.initialized ? this.loadPage() : null}</>
    )
  }
}

export default AdoptionPage
