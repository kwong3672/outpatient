import React, { Component } from 'react';
import axios from 'axios';

import Header from './components/Header';
import Summary from './components/Summary';
import List from './components/List';
import LoadingSpinner from './components/LoadingSpinner';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      total: 0,
      loading: false
    };
  }

  getYelpData = (location) => {
    this.setState({businesses: [], total: 0, loading: true})
    axios.get('http://localhost:8080', {
      params: {
        location : location
      }
    }).then(data => {
      const { businesses, total } = data.data;
      console.log(businesses)
      this.setState({
        businesses: [...this.state.businesses, ...businesses],
        total, 
        loading: false
      }, this.getAllBusinesses)
    })
  }

  render() {
    return (
      <div className="App">
        <Header getYelpData={this.getYelpData}/>
          {(this.state.loading) ? <LoadingSpinner /> : 
            (
              <div className="Sections">
                <Summary total={this.state.total} businesses={this.state.businesses}/>
                <List businesses={this.state.businesses}/>
              </div>
            )
          }
      </div>
    );
  }
}

export default App;
