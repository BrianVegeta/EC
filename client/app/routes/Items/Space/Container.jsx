import React from 'react';
import { connect } from 'react-redux';
import { ItemsPage, FeatureHeader } from '../components/Items';

const ITEM_TYPE = 'space';
const FEATURE_HEADER_TEXT = '全部空間';
class ItemsSpaceContainer extends React.Component {

  componentWillReceiveProps() {
    console.log('will receive props');
  }

  render() {
    return (
      <ItemsPage
        currentType={ITEM_TYPE}
        featureHeader={<FeatureHeader text={FEATURE_HEADER_TEXT} hasIcon />}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, items, routesHelper } = state;
  return { environment, items, routesHelper };
};
export default connect(mapStateToProps)(ItemsSpaceContainer);
