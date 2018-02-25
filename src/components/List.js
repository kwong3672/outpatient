import React, { Component } from 'react';

import Card from './Card';
import '../styles/List.css';

class List extends Component {
  render() {
    this.props.businesses.sort((a, b) => { return b.rating - a.rating })
    return (
      <div className="List">
        {this.props.businesses.map(business => 
          <Card 
            key={business.id} 
            address={business.location.display_address.join(' ')}
            category={business.categories[0].title}
            image_url={business.image_url}
            name={business.name} 
            rating={business.rating}
            reviewCount={business.review_count} />
        )}
      </div>
    );
  }
}

export default List;
