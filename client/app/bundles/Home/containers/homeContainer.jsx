import React from 'react';
import { connect } from 'react-redux';
import Banner from '../components/Banner';
import RecommendCarousel from '../components/RecommendCarousel';
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
        <div style={{ height: '130px' }} />
        <Banner {...this.props} />
        <Firelane />
        <RecommendCarousel type="category" {...this.props} />
        <Firelane />
        <RecommendCarousel type="goods" {...this.props} />
        <Firelane />
        <RecommendCarousel type="service" {...this.props} />
        <Firelane />
        <RecommendCarousel type="space" {...this.props} />
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
