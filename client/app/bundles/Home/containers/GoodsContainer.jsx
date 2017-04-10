import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Items from '../components/Items';
import { fetchCategories } from '../actions/itemsActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class GoodsContainer extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

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
