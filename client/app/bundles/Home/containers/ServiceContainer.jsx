import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Items from '../components/Items';
import FeatureHeader from '../components/Items/FeatureHeader';
import { fetchCategories } from '../actions/itemsActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const ITEM_TYPE = 'service';
const FEATURE_HEADER_TEXT = '全部服務';
class ServiceContainer extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    const featureHeader = (
      <FeatureHeader
        text={FEATURE_HEADER_TEXT}
        hasIcon
      />
    );
    return (
      <Items
        currentType={ITEM_TYPE}
        featureHeader={featureHeader}
        {...this.props}
      />
    );
  }
}
ServiceContainer.propTypes = propTypes;
const mapStateToProps = (state) => {
  const { environment, items, routesHelper } = state;
  return { environment, items, routesHelper };
};
export default connect(mapStateToProps)(ServiceContainer);
