import React from 'react';
import { connect } from 'react-redux';
import LayoutWrapper from './LayoutWrapper';
import Sidebar from './Sidebar';
import Main from './Main';

const ItemContainer = () => (
  <LayoutWrapper sidebar={<Sidebar />}>
    <Main />
  </LayoutWrapper>
);
const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(ItemContainer);
