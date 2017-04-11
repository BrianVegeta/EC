import React from 'react';
import { connect } from 'react-redux';


const CategoriesContainer = (props) => {
  return (
    <div> All Cateogries </div>
  );
};
const mapStateToProps = (state) => {
  const { environment, items, routesHelper } = state;
  return { environment, items, routesHelper };
};
export default connect(mapStateToProps)(CategoriesContainer);
