import React from 'react';
import PropTypes from 'prop-types';
import {HeaderView} from '../stateless/head-views';


// The header logic
export class Header extends React.Component {
  render() {
    return (
      <HeaderView
        name={this.props.name}
        logo={this.props.logo}
      />
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};
