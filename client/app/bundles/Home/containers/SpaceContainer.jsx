import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Items from '../components/Items';
import { fetchCategories } from '../actions/itemsActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};
const ITEM_TYPE = 'space';
class SpaceContainer extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    return <Items category={ITEM_TYPE} {...this.props} />;
  }
}
SpaceContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
  const { environment, items } = state;
  return { environment, items };
};
export default connect(mapStateToProps)(SpaceContainer);
