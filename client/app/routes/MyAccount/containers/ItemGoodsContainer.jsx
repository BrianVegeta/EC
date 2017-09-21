import { connect } from 'react-redux';
import { swalDropItem } from 'lib/swal';
import { CATEGORY_GOODS_ID } from 'constants/enums';
import Container from '../components/Item/Goods';
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
    dispatchFetchItem: () => dispatch(fetchItems(CATEGORY_GOODS_ID, false)),
    dispatchReset: () => {
      dispatch(reset());
    },
    dispatchDelete,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
