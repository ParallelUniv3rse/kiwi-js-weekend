import React from 'react';
import PropTypes from 'prop-types';
import {request} from 'graphql-request';
import {findFlightsQuery} from '../queries';
import {SearchView, ResultsView} from '../stateless/body-views';


export class Search extends React.Component {
  render() {
    return <SearchView handleSearch={this.handleSearch.bind(this)}/>;
  }

  handleSearch(formData) {
    const populateResults = this.props.populateResults;
    if (formData.fromLocation === '') {
      alert('Please fill in the "From" location');
      return;
    }
    if (formData.toLocation === '') {
      alert('Please fill in the "To" location');
      return;
    }
    if (formData.departDate === '') {
      alert('Please fill in the departure Date');
      return;
    }
    request('https://graphql.kiwi.com/', findFlightsQuery, formData)
      .then((data) => {
        console.log(data);
        populateResults(data.allFlights.edges);
      })
      .catch((err) => {
        alert(err.response.errors[0].message);
        console.log(err.response.errors);
      });
  }
}

Search.propTypes = {
  populateResults: PropTypes.func.isRequired,
};

export class Results extends React.Component {
  render() {
    return (
      <ResultsView results={this.props.results} populateResults={this.props.populateResults}/>
    );
  }
}

Results.propTypes = {
  results: PropTypes.array.isRequired,
  populateResults: PropTypes.func.isRequired,
};
