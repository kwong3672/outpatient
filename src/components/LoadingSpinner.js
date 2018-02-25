import React, { Component } from 'react';

import spinner from '../assets/images/spinner.gif';

class LoadingSpinner extends Component {
  render() {
    return (
      <img src={spinner} alt={"Loading spinner"}/>
    )
  }
}

export default LoadingSpinner;
