import { connect } from 'react-redux';

import Item from '../components/Item';
import { fetchRecords, reset, addMessage } from '../modules/messageboard';
import { editItem, reset as resetItem } from '../modules/item';
/* pick dispatch */
const mapStateToProps = ({ environment, item, messageboard, auth }) => ({
  environment,
  item,
  auth,
  messageboard,
});
/* pick dispatch */

const mapDispatchToProps = (dispatch, { params: { pid } }) => ({
  dispatch,
  dispatchFetchItem: () => dispatch(editItem(pid)),
  dispatchRecords: () => dispatch(fetchRecords(pid)),
  dispatchResetMessage: () => dispatch(reset()),
  dispatchReset: () => dispatch(resetItem()),
  dispatchAddMessage: message => dispatch(addMessage(pid, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
