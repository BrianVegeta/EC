import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import Card from './Card';

class CardSlider extends React.Component {

  static sliderSettings() {
    return {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      swipe: false,
      swipeToSlide: false,
    };
  }

  render() {
    const { items, category } = this.props;
    const sliderSettings = this.constructor.sliderSettings();

    return (
      <div style={{ margin: '0 -15px' }} >
        <Slider {...sliderSettings}>
          {
            items.map((item, index) =>
              <div
                key={`${category}_${index}key`}
                style={{ width: '245px', padding: '0 15px' }}
              >
                <Card item={item} />
              </div>,
            )
          }
        </Slider>
      </div>
    );
  }
}

export default CardSlider;
