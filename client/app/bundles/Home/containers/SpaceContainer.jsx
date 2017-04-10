import React from 'react';
import { connect } from 'react-redux';
import Items from '../components/Items';
import FeatureHeader from '../components/Items/FeatureHeader';


const ITEM_TYPE = 'space';
const FEATURE_HEADER_TEXT = '全部空間';
const SpaceContainer = (props) => {
  const featureHeader = (
    <FeatureHeader text={FEATURE_HEADER_TEXT} hasIcon />
  );
  return (
    <Items
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
export default connect(mapStateToProps)(SpaceContainer);
