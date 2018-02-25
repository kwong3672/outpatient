import React, { Component } from 'react';
import axios from 'axios';

import Header from './components/Header';
import Summary from './components/Summary';
import List from './components/List';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      total: 0
    };
  }

  getYelpData = (location) => {
    axios.get('http://localhost:8080', {
      params: {
        location : location
      }
    }).then(data => {
      const { businesses, total } = data.data;
      console.log(businesses)
      this.setState({
        businesses: [...this.state.businesses, ...businesses],
        total
      }, this.getAllBusinesses)
    })
  }

  render() {
    return (
      <div className="App">
        <Header getYelpData={this.getYelpData}/>
        <div className="Sections">
          <Summary total={this.state.total} businesses={this.state.businesses}/>
          <List businesses={this.state.businesses}/>
        </div>
      </div>
    );
  }
}

export default App;
