import React from 'react';
import { connect } from 'react-redux';

const TanzakuContainer = props => (
  <div>1</div>
);
const mapStateToProps = (state) => {
  const { environment, banners, recommends, routesHelper } = state;
  return ({ environment, banners, recommends, routesHelper });
};
export default connect(mapStateToProps)(TanzakuContainer);
