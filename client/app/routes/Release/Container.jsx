import React from 'react';
import { connect } from 'react-redux';

const ReleaseContainer = props => (
  <div>item release</div>
);
const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(ReleaseContainer);
