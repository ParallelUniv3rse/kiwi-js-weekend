import React from 'react';
import PropTypes from 'prop-types';
import {SearchForm} from '../state/search-form';

export const SearchView = props => (
  <div className="card">
    <div className="card-body">
      <h1 className="card-title h4">Kiwi.com quick search</h1>
      <SearchForm handleSearch={props.handleSearch}/>
    </div>
  </div>
);

SearchView.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export const ResultsView = props => (
  <section className="resultsList">
    <a href="#" className="mb-2" onClick={(e) => {
      e.preventDefault();
      props.populateResults(null);
    }}>&larr; search again</a>
    {props.results.map((result, i) => {
      result = result.node;
      const departDate = new Date(result.departure.localTime);
      const arrivalDate = new Date(result.arrival.localTime);
      return (<div key={i} className="card mb-3">
        <h5 className="card-header">{result.departure.airport.city.name}({result.departure.airport.locationId}) &rarr; {result.arrival.airport.city.name}({result.arrival.airport.locationId})</h5>
        <div className="card-body">
          <h6 className="card-title">Departure: {departDate.toLocaleString()}</h6>
          <h6 className="card-title">Arrival: {arrivalDate.toLocaleString()}</h6>
          <h6 className="card-title">Price: <strong>{result.price.amount}{result.price.currency}</strong></h6>
        </div>
      </div>);
    })}
  </section>
);

ResultsView.propTypes = {
  results: PropTypes.array.isRequired,
  populateResults: PropTypes.func.isRequired,
};
