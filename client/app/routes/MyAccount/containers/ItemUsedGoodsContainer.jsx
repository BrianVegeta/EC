import { connect } from 'react-redux';
import { swalDropItem } from 'lib/swal';
import Container from '../components/Item/UsedGoods';
import { fetchItems, deleteItem, reset } from '../modules/myItem';

const mapStateToProps = (state) => {
  const { environment, myItem } = state;
  return ({ environment, myItem });
};

const mapDispatchToProps = (dispatch) => {
  const dispatchDelete = (pid) => {
    swalDropItem().then(() => {
      dispatch(deleteItem(pid));
    }).catch(() => {});
  };
  return ({
    dispatch,
    dispatchFetchItem: () => dispatch(fetchItems('1', true)),
    dispatchReset: () => {
      dispatch(reset());
    },
    dispatchDelete,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
