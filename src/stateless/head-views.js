// Import react
import React from 'react';

export const HeaderView = ({ name, logo }) => (
  <nav className="navbar navbar-expand-xs navbar-light fixed-top">
    <a className="navbar-brand" href="/">
      <img src={logo} alt={name}></img>
    </a>
  </nav>
);
