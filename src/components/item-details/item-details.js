import React, { Component } from 'react';

import Spinner from '../spinner';

import SwapiService from '../../services/swapi-service';
import ErrorButton from "../error-button/error-button";
import './item-details.css';

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: {},
    loading: true, // загрузка 
    error: false // на старте ошибок нет
  };

  componentDidMount() {
    this.updateItem();
  };

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }

    this.swapiService
      .getItem(itemId)
      .then(this.onItemLoaded)
      .catch(this.onError);
  }

  onItemLoaded = (item) => {
    this.setState({
      item,
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

    if (!this.state.item) {
      return <span>Select a person from a list</span>;
    }

    const { item, loading, error } = this.state; // деструктурировали необходимые данные 

    const hasData = !(loading || error);

    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ItemView item={item} /> : null;

    return (
      <div className="item-details card">
        {spinner}
        {content}
      </div>
    )
  }
}

const ItemView = ({item}) => {
  const { id, name, gender, birthYear, eyeColor } = item; // деструктурировали необходимые данные 

  return (
    <React.Fragment>
      <img className="item-image"
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

        <ErrorButton />
      </div>
    </React.Fragment>
  );
};