import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {SearchForm} from '../state/search-form';

export const SearchView = props => (
  <div className="card">
    <div className="card-body">
      <h1 className="card-title h4">Kiwi.com quick search</h1>
      <SearchForm isInProgress={props.isInProgress} handleSearch={props.handleSearch}/>
    </div>
  </div>
);

SearchView.propTypes = {
  isInProgress: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export const ResultView = (props) => {
  const departure = props.result.departure;
  const arrival = props.result.arrival;
  return (<div className="card mb-3">
    <h5 className="card-header">{departure.airport.city.name} ({departure.airport.locationId}) &rarr; {arrival.airport.city.name} ({arrival.airport.locationId})</h5>
    <div className="card-body">
      <h6 className="card-title">Departure: {new Date(departure.localTime).toLocaleString()}</h6>
      <h6 className="card-title">Arrival: {new Date(arrival.localTime).toLocaleString()}</h6>
      <h6 className="card-title">Price: <strong>{props.result.price.amount}{props.result.price.currency}</strong></h6>
    </div>
  </div>);
};

ResultView.propTypes = {
  result: PropTypes.object.isRequired,
};
