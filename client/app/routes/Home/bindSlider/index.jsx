import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import SliderArrow from '../SliderArrow';

export default function bindSlider(Component) {
  return class extends React.Component {
    static defaultProps = {
      slidesToShow: 4,
    };
    static propTypes = {
      items: PropTypes.arrayOf(PropTypes.object).isRequired,
      slidesToShow: PropTypes.number,
    };
    render() {
      const { items, slidesToShow, ...componentProps } = this.props;
      if (items.length <= 0) return null;
      const sliderSettings = {
        infinite: false,
        speed: 500,
        slidesToShow,
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
            {items.map((item, index) =>
              <div key={`${index + 1}`} style={{ padding: '0 15px' }}>
                <Component {...componentProps} item={item} />
              </div>,
            )}
          </Slider>
        </div>
      );
    }
  };
}
