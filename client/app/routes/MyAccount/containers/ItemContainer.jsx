import { connect } from 'react-redux';

import Container from '../components/Item';
import { fetchItems, reset } from '../modules/myItem';

const mapStateToProps = (state) => {
  const { environment, mine, myItem } = state;
  return ({ environment, mine, myItem });
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchFetchItem: catId => dispatch(fetchItems(catId)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
