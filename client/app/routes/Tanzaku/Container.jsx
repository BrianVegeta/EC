import React from 'react';
import { connect } from 'react-redux';
import Cards from './Cards';

const TanzakuContainer = props => (
  <div>
    <Cards />
  </div>
);
const mapStateToProps = (state) => {
  const { environment, banners, recommends, routesHelper } = state;
  return ({ environment, banners, recommends, routesHelper });
};
export default connect(mapStateToProps)(TanzakuContainer);
