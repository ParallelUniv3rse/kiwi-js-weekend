import React from 'react';
import ReactDOM from 'react-dom';

// Visual elements
import {Header} from './state/head';
import {Search, Results} from './state/body';

// Styles
import './styles/styles.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
    };
  }

  // Render the main application element
  render() {
    return (
      <div className="flexify">
        <header>
          <Header
            name="Kiwi.com"
            logo="/img/logo@1x.svg"
            backAction={() => {
              this.populateResults(null);
            }}
          />
        </header>
        <main role="main" className={`container-fluid ${(this.state.results !== null ? 'justify-content-start' : '')}`}>
          {this.state.results === null
            ? <Search populateResults={this.populateResults.bind(this)}/>
            : <Results results={this.state.results} populateResults={this.populateResults.bind(this)}/>
          }
        </main>
      </div>
    );
  }

  populateResults(flightsArray) {
    this.setState({
      results: flightsArray,
    });
  }
}


ReactDOM.render(<App/>, document.getElementById('container'));
