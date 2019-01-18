import React, { Component } from 'react';

import './item-list.css';

import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

export default class ItemList extends Component {
  swapiService = new SwapiService();

  state = {
    people: null
  }

  componentDidMount() {
    this.swapiService
        .getAllPeople()
        .then((peopleList) => {
          this.setState({
            peopleList
          });
        });
  }

  renderItems(arr) {
    return arr.map(({id, name}) => {
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      );
    });
  }
  
  render() {
    const { peopleList } = this.state;

    if (!peopleList) {
      return <ul className="item-list list-group"><Spinner /></ul>;
    }

    const items = this.renderItems(peopleList);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}
