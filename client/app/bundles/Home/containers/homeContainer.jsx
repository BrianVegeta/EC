import React from 'react';
import { connect } from 'react-redux';
import Banner from '../components/Slider';
import RecommendsCarousel from '../components/RecommendsCarousel';
import Firelane from '../components/Firelane';
import { fetchBanners } from '../actions/bannersActions';

class HomeContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchBanners());
  }

  render() {
    return (
      <div>
        <div style={{ height: '30px' }} />
        <Banner {...this.props} />
        <Firelane />
        <RecommendsCarousel category="goods" {...this.props} />
        <Firelane />
        <RecommendsCarousel category="service" {...this.props} />
        <Firelane />
        <RecommendsCarousel category="space" {...this.props} />
        <Firelane />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { environment, banners, recommends } = state;
  return ({ environment, banners, recommends });
};
export default connect(mapStateToProps)(HomeContainer);
