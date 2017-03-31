import React, { PropTypes } from 'react';
import Carousel from 'nuka-carousel';
import { Preload } from 'react-preload';
import Spinner from '../Spinner';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.setCarouselData = Carousel.ControllerMixin.setCarouselData;
  }

  render() {
    const { banners, environment } = this.props;
    // const { containerWidth } = environment;
    // const carouselMaxWidth = 1500
    // const carouselMaxHeight = 840;
    // const sliderHeight = Math.floor((containerWidth / carouselMaxWidth) * carouselMaxHeight);
    const Placehoder = <Spinner height={500} />;

    const { items } = banners;
    if (items.length === 0) {
      return Placehoder;
    }

    const PreloadSettings = {
      loadingIndicator: Placehoder,
      images: [items[0].imageSrc, items[1].imageSrc],
      autoResolveDelay: 3000,
      resolveOnError: true,
      mountChildren: true,
    };
    const CarouselSettings = {
      width: '100%',
      autoplayInterval: 5000,
      wrapAround: true,
      autoplay: true,
    };
    return (
      <Preload {...PreloadSettings} >
        <Carousel {...CarouselSettings} >
          {
            items.map((item) => {
              const key = item.imageSrc;
              const style = {
                backgroundImage: `url(${item.imageSrc})`,
                height: 500,
              };
              return <div key={key} styleName="banner" style={style} />;
            })
          }
        </Carousel>
      </Preload>
    );
  }
}
export default Banner;
