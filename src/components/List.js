import React, { Component } from 'react';

class Business extends Component {
  render() {
    const address = this.props.location.display_address.join(' ');
    return (
      <div>
        <div>Name: {this.props.name}</div>
        <div>Rating: {this.props.rating}</div>
        <div>Number of Reviews: {this.props.reviewCount}</div>
        <div>Address: {address}</div>
      </div>
    )
  }

}

class List extends Component {

  render() {
    this.props.businesses.sort((a, b) => { return b.rating - a.rating })
    return (
      <div>
        <h3>List of Physical Therapists</h3>
        {this.props.businesses.map(business => 
          <Business 
            key={business.id} 
            name={business.name} 
            rating={business.rating}
            reviewCount={business.review_count}
            location={business.location} />
        )}
      </div>
    );
  }
}

export default List;
