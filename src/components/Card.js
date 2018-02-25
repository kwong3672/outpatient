import React, { Component } from 'react';

import '../css/Card.css';

import zero from '../assets/images/regular_0.png';
import one from '../assets/images/regular_1.png';
import one_half from '../assets/images/regular_1_half.png';
import two from '../assets/images/regular_2.png';
import two_half from '../assets/images/regular_2_half.png';
import three from '../assets/images/regular_3.png';
import three_half from '../assets/images/regular_3_half.png';
import four from '../assets/images/regular_4.png';
import four_half from '../assets/images/regular_4_half.png';
import five from '../assets/images/regular_5.png';


const rating = {
  0: zero,
  1: one,
  1.5: one_half,
  2: two,
  2.5: two_half,
  3: three,
  3.5: three_half,
  4: four,
  4.5: four_half,
  5: five
}

class Card extends Component {
  render() {
    return (
      <div className="Card">
        <img src={this.props.image_url} className="image"/>
        <div className="description">
          <h3 className="title">{this.props.name}</h3>
          <div>
            <img src={rating[this.props.rating]} />
            <span className="review_count">{this.props.reviewCount} reviews</span>
          </div>
          <div>{this.props.category}</div>
          <div>{this.props.address}</div>
        </div>
      </div>
    )
  }
}

export default Card;
