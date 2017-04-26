import React from 'react';
import { connect } from 'react-redux';

const Container = () => (
  <div>
    <h2>About</h2>
  </div>
);

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(Container);
