import React from 'react';
import { connect } from 'react-redux';
import Firelane from '../../components/Firelane';
import Banner from './Banner';
import RecommendCarousel from './RecommendCarousel';

const HomeContainer = props => (
  <div>
    <Banner {...props} />
    <Firelane />
    <RecommendCarousel type="category" {...props} />
    <Firelane />
    <RecommendCarousel type="goods" {...props} />
    <Firelane />
    <RecommendCarousel type="service" {...props} />
    <Firelane />
    <RecommendCarousel type="space" {...props} />
    <Firelane />
  </div>
);
const mapStateToProps = (state) => {
  const { environment, banners, recommends } = state;
  return ({ environment, banners, recommends });
};
export default connect(mapStateToProps)(HomeContainer);
