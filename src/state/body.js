import React from 'react';
import PropTypes from 'prop-types';
import {request} from 'graphql-request';
import ReactPaginate from 'react-paginate';
import {findFlightsQuery} from '../queries';
import {SearchView, ResultView} from '../stateless/body-views';


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
  constructor(props) {
    super(props);
    this.resultsPerPage = 5;
    this.state = {
      results: props.results,
      currentPage: 1,
      pageCount: props.results.length / this.resultsPerPage,
    };
  }

  handlePageClick(data) {
    const selected = data.selected;
    this.setState({
      currentPage: selected,
    });
    window.scrollTo(0, 0);
  }

  render() {
    const start = this.state.currentPage * this.resultsPerPage;
    const end = start + this.resultsPerPage;
    const currentResults = this.state.results.slice(start, end);
    const resultNodes = currentResults.map((result, i) => {
      result = result.node;
      return (<ResultView key={i} result={result}/>);
    });
    return (
      <section className="resultsList">
        <a href="#" className="mb-2" onClick={(e) => {
          e.preventDefault();
          this.props.populateResults(null);
        }}>&larr; search again</a>
        {resultNodes}
        <ReactPaginate
          previousLabel={'back'}
          nextLabel={'next'}
          nextClassName={'page-item'}
          previousClassName={'page-item'}
          nextLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          breakClassName={'page-item'}
          breakLabel={<span className={'page-link'}>...</span>}
          onPageChange={this.handlePageClick.bind(this)}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          activeClassName={'active'}/>
      </section>
    );
  }
}

Results.propTypes = {
  results: PropTypes.array.isRequired,
  populateResults: PropTypes.func.isRequired,
};
