import React, { Component } from 'react'
import PetfulApiService from '../../services/petful-api-services'
import './AdoptionPage.css'

// components
import PetCard from '../../components/PetCard/PetCard'
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
      isCat ? this.setState({ cat: petAdopted, people: persons }) : this.setState({ dog: petAdopted, people: persons })
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
    console.log(e.target.name.value)
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
    const { cat, dog, people, user } = this.state;
    return (
      <>
        <nav />
        <h2>Animals Available For Adoption</h2>
        <main>
          <div className="card">
            <PetCard pet={cat} />
            {people[0] === user ? <AdoptButton executeAdoption={this.executeAdoption} type={"cat"} person={people[0]} /> : null}
          </div>

          <div className="card">
            <PetCard pet={dog} />
            {people[0] === user ? <AdoptButton executeAdoption={this.executeAdoption} type={"dog"} person={people[0]} /> : null}
          </div>

          <div className="form-card">
            <ul>
              {people.map((person, index) => (
                <li key={index}>
                  {index === 0 && <span>Up Next: </span>}
                  {person.name}
                </li>
              ))}
            </ul>

            <form onSubmit={(e) => this.onSubmitToQueue(e)}>
              <label className="basic-label">Name: <input className="basic-input" type="text" name="name"/></label>
              <input className="submit-btn" type="submit" value="Submit" />
            </form>
          </div>
        </main>
      </>
    )
  }

  render() {
    return (
      <>
      {this.state.initialized ? this.loadPage() : null}</>
    )
  }
}

export default AdoptionPage


// {/* Display list of people currently in line - Person object returning null, otherwise this works*/ }
// {/* hide adopt button if name NOT in front - Todo, need to make a user state, and set it when a person adds themself to the line */ }
// {/* 5 seconds, the user at the front of the line remove, select random pet */ }
// {/* When user at front, make adopt button appear, stop the move queue timer */ }
// {/* ONLY when user at front , generate random person at back of line every five seconds until line is 5, max 5 people */ }