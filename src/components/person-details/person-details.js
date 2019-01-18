import React, { Component } from 'react';

import Spinner from '../spinner';

import SwapiService from '../../services/swapi-service';
import './person-details.css';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: {},
    loading: true, // загрузка 
    error: false // на старте ошибок нет
  };

  componentDidMount() {
    this.updatePerson();
  };

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId ) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then(this.onPersonLoaded)
      .catch(this.onError);
  }

  onPersonLoaded = (person) => {
    this.setState({
      person,
      loading: false
    })
  };

  // ошибки
  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  };

  render() {

    if (!this.state.person) {
      return <span>Select a person from a list</span>;
    }

    const { person, loading, error } = this.state; // деструктурировали необходимые данные 

    const hasData = !(loading || error);

    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PersonView person={person} /> : null;

    return (
      <div className="person-details card">
        {spinner}
        {content}
      </div>
    )
  }
}

const PersonView = ({person}) => {
  const { id, name, gender, birthYear, eyeColor } = person; // деструктурировали необходимые данные 

  return (
    <React.Fragment>
      <img className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt="character"/>

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};