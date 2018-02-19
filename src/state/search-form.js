import React from 'react';
import PropTypes from 'prop-types';


export class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        fromLocation: '',
        toLocation: '',
        departDate: '',
      },
    };
  }

  handleInput(event, inputName) {
    this.setState({
      form: { ...this.state.form, ...{ [inputName]: event.target.value } },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = this.state.form;
    this.props.handleSearch(formData);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="fromLocation">From:</label>
            <input type="text" value={this.state.form.fromLocation} onChange={(e) => {
              this.handleInput(e, 'fromLocation');
            }} className="form-control" name="fromLocation" id="fromLocation" placeholder="New York"/>
          </div>
          <div className="form-group col">
            <label htmlFor="toLocation">To:</label>
            <input type="text" value={this.state.form.toLocation} onChange={(e) => {
              this.handleInput(e, 'toLocation');
            }} className="form-control" name="toLocation" id="toLocation" placeholder="London"/>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col">
            <label htmlFor="departDate">Departure date:</label>
            <input type="date" value={this.state.form.departDate} onChange={(e) => {
              this.handleInput(e, 'departDate');
            }} className="form-control" name="departDate" id="departDate" placeholder="Departure date"/>
          </div>
        </div>
        <div className="form-row">
          <div className="col-12 text-right">
            <button type="submit" className="btn btn-primary">Show cheapest flights</button>
          </div>
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
