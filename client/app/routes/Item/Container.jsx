import React from 'react';
import { connect } from 'react-redux';
import LayoutWrapper from './LayoutWrapper';
import Sidebar from './Sidebar';

const ItemContainer = () => (
  <LayoutWrapper sidebar={<Sidebar />}>
    <div>main</div>
  </LayoutWrapper>
);
const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(ItemContainer);
