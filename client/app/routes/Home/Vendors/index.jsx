import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import myPropTypes from '../../../propTypes';
import SliderArrow from '../SliderArrow';

class Vendors extends React.Component {
  static propTypes = {
    vendors: PropTypes.array.isRequired,
  };
  render() {
    const { vendors } = this.props;
    if (vendors.length <= 0) return null;
    const sliderSettings = {
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      swipe: false,
      swipeToSlide: false,
      prevArrow: <SliderArrow side="left" />,
      nextArrow: <SliderArrow side="right" />,
    };
    return (
      <div style={{ margin: '0 -15px' }} >
        <Slider {...sliderSettings}>
          {vendors.map((vendor, index) =>
            <div key={`${index + 1}`} style={{ padding: '0 15px' }}>
              test
            </div>,
          )}
        </Slider>
      </div>
    );
  }
}

export default Vendors;
