import React, { Component } from 'react';

import Spinner from '../spinner';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';
import ErrorIndicator from '../error-indicator/error-indicator';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {}, // на старте планеты нет
    loading: true, // загрузка 
    error: false // на старте ошибок нет
  };

  constructor() {
    super();
    this.updatePlanet(); // вызываем в конструкторе обновление планет
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false
    })
  };

  updatePlanet() {
    const id = 15; 
    this.swapiService
        .getPlanet(id)
        .then(this.onPlanetLoaded)
        .catch(this.onError);
  };

  // ошибки
  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  };

  render() {
    const { planet, loading, error } = this.state; // деструктурировали необходимые данные 

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const PlanetView = ({planet}) => {
  const { id, name, population, rotationPeriod, diameter } = planet; // деструктурировали необходимые данные 

  return (
    <React.Fragment>
      <img className="planet-image"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}	
          alt="planet" />
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};