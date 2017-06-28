import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
// import myPropTypes from '../../../propTypes';
import ItemCard from './ItemCard';
import SliderArrow from '../SliderArrow';
import ItemModel from './ItemModel';

class Categories extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  render() {
    const { items } = this.props;
    const sliderSettings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      swipe: false,
      swipeToSlide: false,
      prevArrow: <SliderArrow side="left" coverAlign />,
      nextArrow: <SliderArrow side="right" coverAlign />,
    };
    return (
      <div style={{ margin: '0 -15px' }} >
        <Slider {...sliderSettings}>
          {items.map((item, index) =>
            <div key={`${index + 1}`} style={{ padding: '0 15px' }}>
              <ItemCard item={new ItemModel(item)} />
            </div>,
          )}
        </Slider>
      </div>
    );
  }
}

export default Categories;
