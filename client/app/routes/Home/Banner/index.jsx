import React, { PropTypes } from 'react';
import Carousel from 'nuka-carousel';
import { Preload } from 'react-preload';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Spinner from '../../../components/Spinner';
import { fetchBanners } from '../../../actions/bannersActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  banners: PropTypes.object.isRequired,
};
class Banner extends React.Component {

  static confCarousel() {
    return {
      width: '100%',
      autoplayInterval: 5000,
      wrapAround: true,
      autoplay: true,
    };
  }

  constructor(props) {
    super(props);
    this.setCarouselData = Carousel.ControllerMixin.setCarouselData;
    this.carouselHeight = 500;
  }

  componentDidMount() {
    this.props.dispatch(fetchBanners());
  }

  styleCarouselItem(item) {
    return {
      backgroundImage: `url(${item.imageSrc})`,
      height: this.carouselHeight,
    };
  }

  confPreloadImage(items) {
    return {
      loadingIndicator: <Spinner height={this.carouselHeight} />,
      images: [items[0].imageSrc, items[1].imageSrc],
      autoResolveDelay: 3000,
      resolveOnError: true,
      mountChildren: true,
    };
  }

  render() {
    const { banners } = this.props;
    const { items } = banners;
    // TODO: carousel width x height
    if (items.length <= 0) {
      return <Spinner height={this.carouselHeight} />;
    }

    const { confCarousel } = this.constructor;
    return (
      <Preload {...this.confPreloadImage(items)} >
        <Carousel {...confCarousel()} >
          {items.map(item =>
            <div
              key={item.imageSrc}
              styleName="banner"
              style={this.styleCarouselItem(item)}
            />,
          )}
        </Carousel>
      </Preload>
    );
  }
}
Banner.propTypes = propTypes;
export default CSS(Banner, styles);
