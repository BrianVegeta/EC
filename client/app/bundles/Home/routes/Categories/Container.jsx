import React from 'react';
import { connect } from 'react-redux';
import Firelane from '../../components/Firelane';
import List from './List';
import Splitline from './List/Splitline';


const CategoriesContainer = props => (
  <div>
    <List type="goods" {...props} />
    <Splitline />
    <Firelane distance={80} />
    <List type="service" {...props} />
    <Splitline />
    <Firelane distance={80} />
    <List type="space" {...props} />
  </div>
);
const mapStateToProps = (state) => {
  const { environment, items, routesHelper } = state;
  return { environment, items, routesHelper };
};
export default connect(mapStateToProps)(CategoriesContainer);
