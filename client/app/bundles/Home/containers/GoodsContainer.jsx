import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Items from '../components/Items';
import { fetchCategories, fetchItems } from '../actions/itemsActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

class GoodsContainer extends React.Component {
  render() {
    return <Items category="goods" {...this.props} />;
  }
}

GoodsContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  const {
    environment,
    items,
  } = state;

  return ({
    environment,
    items,
  });
};
export default connect(mapStateToProps)(GoodsContainer);
