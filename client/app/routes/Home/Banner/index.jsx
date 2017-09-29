import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'rmc-nuka-carousel';
import { Link } from 'react-router';
import { Preload } from 'react-preload';
// import { userprofilePaths, itemPath } from 'lib/paths';
import CSS from 'react-css-modules';
import Spinner from 'components/Spinner';
import { fetchBanners } from 'actions/bannersActions';
import styles from './styles.sass';
import DecoratorDots from './DecoratorDots';
import BannerAction from './BannerAction';


class Banner extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    banners: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  constructor(props) {
    super(props);
    this.setCarouselData = Carousel.ControllerMixin.setCarouselData;
    this.carouselHeight = 500;
  }

  componentDidMount() {
    this.props.dispatch(fetchBanners());
  }

  render() {
    const { banners } = this.props;
    // TODO: carousel width x height
    if (banners.length <= 0) {
      return <Spinner height={this.carouselHeight} />;
    }

    return (
      <Preload
        {...{
          loadingIndicator: <Spinner height={this.carouselHeight} />,
          images: banners.map(banner => banner.imageSrc).slice(0, 2),
          autoResolveDelay: 3000,
          resolveOnError: true,
          mountChildren: true,
        }}
      >
        <div styleName="container">
          <Carousel
            {...{
              width: '100%',
              autoplayInterval: 5000,
              wrapAround: true,
              autoplay: true,
              decorators: [{
                component: DecoratorDots,
                position: 'BottomLeft',
                className: 'test',
                style: { left: 0, right: 0, bottom: 0 },
              }],
            }}
          >
            {banners.map(item => (
              <BannerAction item={item} >
                <div
                  styleName="banner"
                  style={{
                    backgroundImage: `url(${item.url})`,
                    height: this.carouselHeight,
                  }}
                />
              </BannerAction>
            ))}
          </Carousel>
        </div>
      </Preload>
    );
  }
}
export default CSS(Banner, styles);
