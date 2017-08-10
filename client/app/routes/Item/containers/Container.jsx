import { connect } from 'react-redux';

import Item from '../components/Item';
import { fetchRecords, reset, addMessage } from '../modules/messageboard';
import { editItem } from '../modules/item';
/* pick dispatch */
const mapStateToProps = ({ environment, item, messageboard, auth }) => ({
  environment, item, auth, messageboard,
});
/* pick dispatch */

const mapDispatchToProps = (dispatch, { params }) => ({
  dispatch,
  dispatchFetchItem: () => dispatch(editItem(params.pid)),
  dispatchRecords: () => dispatch(fetchRecords(params.pid)),
  dispatchReset: () => dispatch(reset()),
  dispatchAddMessage: (message) =>
  dispatch(addMessage(params.pid, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
