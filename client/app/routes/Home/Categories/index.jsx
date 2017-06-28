import React from 'react';
import Slider from 'react-slick';
import myPropTypes from '../../../propTypes';
import SliderArrow from '../SliderArrow';
import Category from './Category';

class Categories extends React.Component {
  static propTypes = {
    categories: myPropTypes.categories.isRequired,
  };
  render() {
    const { categories } = this.props;
    const sliderSettings = {
      infinite: false,
      speed: 500,
      slidesToShow: 6,
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
          {categories.map((category, index) =>
            <div key={`${index + 1}`} style={{ padding: '0 15px' }}>
              <Category category={category} />
            </div>,
          )}
        </Slider>
      </div>
    );
  }
}

export default Categories;
