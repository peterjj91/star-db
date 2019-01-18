import React, { Component } from 'react';

import SwapiService from '../../services/swapi-service';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorIndicator from '../error-indicator/error-indicator';

import './people-page.css';

const Row = ({left, right}) => {
  return (
    <div className="row mb2">
      <div className="col-md-6">
        {left}
      </div>
      <div className="col-md-6">
        {right}
      </div>
    </div>
  );
};

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 3,
    showPersonDetails: true,
    hasError: false
  };

  componentDidCatch(error, info) {
    debugger;

    this.setState({
      hasError: true
    });
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({ 
      selectedPerson,
      showPersonDetails: !selectedPerson.showPersonDetails
    });
  };

  render() {

    const itemList = <ItemList 
    onItemSelected={this.onPersonSelected} 
    getData={this.swapiService.getAllPeople}
    renderItem={({name, gender, birthYear}) => `${name} ${gender} ${birthYear}`}/>;
    const personDetails = this.state.showPersonDetails ? <PersonDetails personId={this.state.selectedPerson} /> : null;

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    return (
      <Row left={itemList} right={personDetails} />
    );
  }
}
