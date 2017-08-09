import React from 'react';
import PropTypes from 'prop-types';
import ItemSlider from './ItemSlider';
import CategorySlider from './CategorySlider';

const propTypes = { type: PropTypes.string.isRequired };
const Slider = (props) => {
  switch (props.type) {
    case 'category':
      return <CategorySlider {...props} />;
    default:
      return <ItemSlider {...props} />;
  }
};
Slider.propTypes = propTypes;
export default Slider;
