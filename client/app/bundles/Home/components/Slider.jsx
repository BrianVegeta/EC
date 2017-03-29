import React, { PropTypes } from 'react';
import Carousel from 'nuka-carousel';
import { Preload } from 'react-preload';
import Spinner from './Spinner';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.setCarouselData = Carousel.ControllerMixin.setCarouselData;
  }

  render() {
    const { containerWidth } = this.props.environment;
    const carouselMaxWidth = 1500
    const carouselMaxHeight = 840;
    const sliderHeight = Math.floor((containerWidth / carouselMaxWidth) * carouselMaxHeight);

    if (this.props.banners.items.length === 0) {
      return <Spinner height={sliderHeight} />;
    }

    const { items } = this.props.banners;
    const firstImageSrc = items[0].imageSrc;
    return (
      <Preload
        loadingIndicator={<Spinner height={sliderHeight} />}
        images={[firstImageSrc]}
        autoResolveDelay={3000}
        resolveOnError
        mountChildren
      >
        <Carousel
          width="100%"
          wrapAround
          autoplay
          autoplayInterval={5000}
        >
          {
            items.map(item =>
              <img key={item.imageSrc} src={item.imageSrc} alt="" height={sliderHeight} />,
            )
          }
        </Carousel>
      </Preload>
    );
  }
}

export default Slider;
