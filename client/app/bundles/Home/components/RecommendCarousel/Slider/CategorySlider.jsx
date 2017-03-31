import React, { PropTypes } from 'react';
import Category from './Category';

const propTypes = {
  items: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};
class CategorySlider extends React.Component {

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
    const categories = items.map((item, index) => {
      const key = `${type}_${index}key`;
      return <Category {...{ key, item }} />;
    });

    return (
      <div>
        { categories }
      </div>
    );
  }
}
CategorySlider.propTypes = propTypes;
export default CategorySlider;
