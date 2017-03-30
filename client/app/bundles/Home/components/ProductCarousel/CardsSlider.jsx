import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import Card from './Card';

class CardSlider extends React.Component {
  render() {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      swipe: false,
      swipeToSlide: false,
    };
    const collections = [1, 2, 3, 4, 5, 6];
    return (
      <div style={{ margin: '0 -15px' }} >
        <Slider {...settings}>
          {
            collections.map((index) => {
              const style = { width: '245px', padding: '0 15px' };
              return (
                <div key={`${index}key`} style={style}><Card /></div>
              );
            })
          }
        </Slider>
      </div>
    );
  }
}

export default CardSlider;
