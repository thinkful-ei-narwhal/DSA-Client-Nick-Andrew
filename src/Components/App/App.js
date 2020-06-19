import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css';

// Components
import Nav from '../Nav/Nav'
import LandingPage from '../../Routes/LandingPage/LandingPage'
import AdoptionPage from '../../Routes/AdoptionPage/AdoptionPage'



class App extends Component {
  state = { hasError: false }


  render() {
    return (
      <div className='App'>
        <header>
          <Nav />
        </header>
        <main>
          <Switch>
            <Route
              exact
              path={'/'}
              component={LandingPage}
            />
            <Route
              path={'/adoption'}
              component={AdoptionPage}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App;
