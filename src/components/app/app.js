import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import { 
  PeoplePage, 
  PlanetsPage, 
  StarshipsPage,
  LoginPage, 
  SecretPage
} from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context';

import './app.css';

import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    });
  };

  render() {
    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry> {/* ErrorBoundry обработчик ошибок */}
        <SwapiServiceProvider value={this.state.swapiService} > {/* SwapiServiceProvider дается 'глобальные переменные' */}
          <Router>
            <div className="stardb-app container">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
              
              <Switch> {/* обработка ошибок */}
                <Route 
                  path="/" 
                  render={() => <h2>Welcome to StarDB</h2>} 
                  exact /> {/* Router занимается маршрутами */}
                <Route 
                  path="/people/:id?" 
                  component={PeoplePage} />
                <Route 
                  path="/planets" 
                  component={PlanetsPage} />
                <Route 
                  path="/starships" 
                  component={StarshipsPage}
                  exact />
                <Route 
                  path="/starships/:id" 
                  render={({ match }) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id} />
                  }} />
                <Route 
                  path="/login" 
                  render={() => (
                    <LoginPage 
                      isLoggedIn={isLoggedIn}
                      onLogin={this.onLogin} />
                  )} />
                <Route 
                  path="/secret"
                  render={() => (
                    <SecretPage isLoggedIn={isLoggedIn} />
                  )} />

                <Route render={() => <h2>Page not found</h2>} /> {/* если ни один из Route не сработал */}
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
