import React from 'react';
import { connect } from 'react-redux';
import { ItemsPage, FeatureHeader } from '../components/Items';


const ITEM_TYPE = 'goods';
const FEATURE_HEADER_TEXT = '全部物品';
const GoodsContainer = (props) => {
  const featureHeader = (
    <FeatureHeader text={FEATURE_HEADER_TEXT} hasIcon />
  );
  return (
    <ItemsPage
      currentType={ITEM_TYPE}
      featureHeader={featureHeader}
      {...props}
    />
  );
};
const mapStateToProps = (state) => {
  const { environment, items, routesHelper } = state;
  return { environment, items, routesHelper };
};
export default connect(mapStateToProps)(GoodsContainer);