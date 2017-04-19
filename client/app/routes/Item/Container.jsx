import React from 'react';
import { connect } from 'react-redux';
import LayoutWrapper from './LayoutWrapper';
import Sidebar from './Sidebar';
import Main from './Main';

const ItemContainer = props => (
  <LayoutWrapper sidebar={<Sidebar {...props} />}>
    <Main {...props} />
  </LayoutWrapper>
);
const mapStateToProps = (state) => {
  const { environment, routesHelper, itemLayout } = state;
  return ({ environment, routesHelper, itemLayout });
};
export default connect(mapStateToProps)(ItemContainer);
