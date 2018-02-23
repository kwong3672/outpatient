import React, { Component } from 'react';
import '../css/Summary.css';

class Summary extends Component {

  getAverage = () => {
    const numBusinesses = this.props.businesses.length;
    let aveRating = 0;
    if (numBusinesses > 0) {
      const ratings = this.props.businesses.reduce((totalRatings, business) => { return totalRatings + business.rating }, 0)
      aveRating = (ratings / numBusinesses).toFixed(1);
    }
    return aveRating
  }

  getReviewCount = () => {
    return this.props.businesses.reduce((count, business) => { return count + business.review_count }, 0)
  }

  render() {
    return (
      <div className="Summary">
        <h3>Summary</h3>
        <div>Total: {this.props.total}</div>
        <div>Businesses: {this.props.businesses.length}</div>
        <div>Average Rating: {this.getAverage()}</div>
        <div>Number of Reviews: {this.getReviewCount()}</div>
      </div>
    );
  }
}

export default Summary;
