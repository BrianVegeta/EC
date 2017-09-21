import { connect } from 'react-redux';
import { swalDropItem } from 'lib/swal';
import Container from '../components/Item/Service';
import { fetchItems, deleteItem, reset } from '../modules/myItem';

const mapStateToProps = (state) => {
  const { environment, myItem } = state;
  return ({ environment, myItem });
};

const mapDispatchToProps = (dispatch) => {
  const dispatchDelete = pid =>
    swalDropItem().then(() => {
      dispatch(deleteItem(pid));
    }).catch(() => {});

  return ({
    dispatch,
    dispatchFetchItem: () => dispatch(fetchItems('2', false)),
    dispatchReset: () => {
      dispatch(reset());
    },
    dispatchDelete,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
