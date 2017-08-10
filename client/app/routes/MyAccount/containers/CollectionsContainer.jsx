import { connect } from 'react-redux';

import Container from '../components/Collections';
import { fetchCollections, reset } from '../modules/myCollection';

const mapStateToProps = (state) => {
  const { environment, myCollections } = state;
  return ({ environment, myCollections });
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchFetchItem: () => dispatch(fetchCollections()),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
