import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Card from './Card';

class ItemSlider extends React.Component {

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
    const { items, type } = this.props;
    const sliderSettings = this.constructor.sliderSettings();

    return (
      <div style={{ margin: '0 -15px' }} >
        <Slider {...sliderSettings}>
          {
            items.map((item, index) => {
              const key = `${type}_${index}key`;
              const style = { width: '245px', padding: '0 15px' };
              return (
                <div {...{ key, style }} >
                  <Card item={item} />
                </div>
              );
            })
          }
        </Slider>
      </div>
    );
  }
}

export default ItemSlider;
