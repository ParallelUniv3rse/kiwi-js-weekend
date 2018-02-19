import React from 'react';
import PropTypes from 'prop-types';
import {request} from 'graphql-request';
import {findLocationSuggestions} from '../queries';
import Autosuggest from 'react-autosuggest';

export class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        fromLocation: '',
        toLocation: '',
        departDate: '',
      },
      suggestions: [],
    };
    this.suggestionsTheme = {
      container: '',
      containerOpen: '',
      input: '',
      inputOpen: '',
      inputFocused: '',
      suggestionsContainer: 'dropdown-menu',
      suggestionsContainerOpen: 'show',
      suggestionsList: 'list-unstyled',
      suggestion: 'dropdown-item clickable',
      suggestionFirst: '',
      suggestionHighlighted: '',
      sectionContainer: '',
      sectionContainerFirst: '',
      sectionTitle: '',
    };
  }


  onSuggestionsFetchRequested({ value }) {
    const inputValue = value.trim();
    const inputLength = inputValue.length;
    const _this = this;
    if (inputLength === 0) {
      _this.onSuggestionsClearRequested();
    } else {
      request('https://graphql.kiwi.com/', findLocationSuggestions, { input: inputValue })
        .then((data) => {
          this.setState({
            suggestions: data.allLocations.edges,
          });
        })
        .catch((err) => {
          _this.onSuggestionsClearRequested();
        });
    }
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  renderSuggestion(suggestion) {
    const value = suggestion.node.name + (suggestion.node.city === null ? '' : ` (${suggestion.node.locationId})`)
    return (
      <span>
        {value}
      </span>
    );
  }

  getSuggestionValue(suggestion) {
    return suggestion.node.name;
  }

  handleInput(event, inputName) {
    this.setState({
      data: { ...this.state.data, ...{ [inputName]: event.target.value } },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = this.state.data;
    this.props.handleSearch(formData);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="fromLocation">From:</label>
            <Autosuggest
              theme={this.suggestionsTheme}
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
              getSuggestionValue={this.getSuggestionValue.bind(this)}
              renderSuggestion={this.renderSuggestion.bind(this)}
              inputProps={{
                value: this.state.data.fromLocation,
                onChange: (e, { newValue }) => {
                  const fakeEvent = { target: { value: newValue } };
                  this.handleInput(fakeEvent, 'fromLocation');
                },
                className: 'form-control',
                name: 'fromLocation',
                id: 'fromLocation',
                placeholder: 'PRG',
                type: 'text',
              }}
            />
          </div>
          <div className="form-group col">
            <label htmlFor="toLocation">To:</label>
            <Autosuggest
              theme={this.suggestionsTheme}
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
              getSuggestionValue={this.getSuggestionValue.bind(this)}
              renderSuggestion={this.renderSuggestion.bind(this)}
              inputProps={{
                value: this.state.data.toLocation,
                onChange: (e, { newValue }) => {
                  const fakeEvent = { target: { value: newValue } };
                  this.handleInput(fakeEvent, 'toLocation');
                },
                className: 'form-control',
                name: 'toLocation',
                id: 'toLocation',
                placeholder: 'London',
                type: 'text',
              }}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="departDate">Departure date:</label>
            <input type="date" value={this.state.data.departDate} onChange={(e) => {
              this.handleInput(e, 'departDate');
            }} className="form-control" name="departDate" id="departDate" placeholder="Departure date"/>
          </div>
        </div>
        <div className="form-row">
          <div className="col-12 text-right">
            <button type="submit" className="btn btn-primary">{this.props.isInProgress ? 'Fetching results...' : 'Show cheapest flights'}</button>
          </div>
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  isInProgress: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
