import React, { PropTypes } from 'react';
import Header from './Header';
import CardsSlider from './CardsSlider';

class ProductCarousel extends React.Component {
  render() {
    return (
      <div>
        <Header {...{ carouselType: 'item' }} />
        <CardsSlider />
      </div>
    );
  }
}

export default ProductCarousel;

// 物品，服務，空間
