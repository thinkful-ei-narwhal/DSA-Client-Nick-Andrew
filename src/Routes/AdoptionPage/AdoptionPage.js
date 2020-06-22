import React, { Component } from "react";
import PetfulApiService from "../../services/petful-api-services";
import "./AdoptionPage.css";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

// components
import PetCard from "./../../Components/PetCard/PetCard";
import AdoptButton from "./../../Components/AdoptButton/AdoptButton";

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
      enableSubmit: true,
    };
  }

  executeAdoption = (pet, reenableSubmit = false) => {
    let isCat;
    let petAdopted;

    const promise1 =
      pet === "cat"
        ? PetfulApiService.deleteCat()
            .then((data) => {
              return PetfulApiService.getCat();
            })
            .then((data) => {
              isCat = true;
              return (petAdopted = data);
            })
        : PetfulApiService.deleteDog()
            .then((data) => {
              return PetfulApiService.getDog();
            })
            .then((data) => {
              isCat = false;
              return (petAdopted = data);
            });

    const promise2 = PetfulApiService.deletePeople().then((data) => {
      return PetfulApiService.getPeople();
    });

    Promise.all([promise1, promise2]).then(([res1, res2]) => {
      if (reenableSubmit) {
        isCat
          ? this.setState({
              cat: petAdopted,
              people: res2,
              enableSubmit: true,
            })
          : this.setState({
              dog: petAdopted,
              people: res2,
              enableSubmit: true,
            });
      } else {
        isCat
          ? this.setState({ cat: petAdopted, people: res2 })
          : this.setState({ dog: petAdopted, people: res2 });
      }
    });
  };

  onAddRandomAdopter = (adopterName) => {
    PetfulApiService.postPeople(adopterName)
      .then((data) => {
        return PetfulApiService.getPeople();
      })
      .then((data) => this.setState({ people: data }))
      .catch((error) => {
        this.setState({ error: error });
      });
  };

  componentDidMount() {
    setInterval(
      () =>
        this.intervalFunction(
          this.state,
          this.executeAdoption,
          this.onAddRandomAdopter
        ),
      5000
    );
    let newState = {
      cat: null,
      dog: null,
      people: [],
      error: null,
      initialized: false,
      user: "",
    };
    const promise1 = PetfulApiService.getCat()
      .then((data) => {
        newState.cat = data;
      })
      .catch((error) => {
        this.setState({ error: error });
      });

    const promise2 = PetfulApiService.getDog()
      .then((data) => {
        newState.dog = data;
      })
      .catch((error) => {
        this.setState({ error: error });
      });

    const promise3 = PetfulApiService.getPeople()
      .then((data) => {
        newState.people = data;
      })
      .catch((error) => {
        this.setState({ error: error });
      });

    Promise.all([promise1, promise2, promise3]).then(() => {
      newState.initialized = true;
      this.setState(newState);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  intervalFunction(state, executeAdoption, onAddRandomAdopter) {
    const { name } = state.people[0];
    if (name !== state.user) {
      const isCat = Math.floor(Math.random() * Math.floor(2));
      const catOrDog = isCat ? "cat" : "dog";

      executeAdoption(catOrDog);
    }

    if (state.people.length < 5) {
      const shortName = uniqueNamesGenerator({
        dictionaries: [colors, adjectives, animals],
      });
      onAddRandomAdopter(shortName);
    }
  }

  onSubmitToQueue(e) {
    e.preventDefault();
    this.setState({ user: e.target.name.value });
    PetfulApiService.postPeople(e.target.name.value)
      .then((data) => {
        PetfulApiService.getPeople().then((data) =>
          this.setState({ people: data, enableSubmit: false })
        );
      })
      .catch((error) => {
        this.setState({ error: error });
      });
    return (e.target.name.value = "");
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
            {people[0].name === user ? (
              <AdoptButton
                executeAdoption={this.executeAdoption}
                type={"cat"}
              />
            ) : null}
          </div>

          <div className="card">
            <PetCard pet={dog} />
            {people[0].name === user ? (
              <AdoptButton
                executeAdoption={this.executeAdoption}
                type={"dog"}
              />
            ) : null}
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

            {this.state.enableSubmit && (
              <form onSubmit={(e) => this.onSubmitToQueue(e)}>
                <label className="basic-label">
                  Name:{" "}
                  <input className="basic-input" type="text" name="name" />
                </label>
                <input className="submit-btn" type="submit" value="Submit" />
              </form>
            )}
          </div>
        </main>
      </>
    );
  }

  render() {
    return <>{this.state.initialized ? this.loadPage() : null}</>;
  }
}

export default AdoptionPage;