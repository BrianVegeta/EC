import { connect } from 'react-redux';
import swal, { dropConfig } from 'lib/swal';
import Container from '../components/Item/Goods';
import { fetchItems, deleteItem, reset } from '../modules/myItem';

const mapStateToProps = (state) => {
  const { environment, myItem } = state;
  return ({ environment, myItem });
};

const mapDispatchToProps = (dispatch) => {
  const dispatchDelete = (pid) => {
    swal(dropConfig({
      title: '確定下架此商品？',
      text: '下架之後即無法還原',
      confirmText: '下架',
    })).then(() => {}).catch(() => {
      dispatch(deleteItem(pid));
    });
  };
  return ({
    dispatch,
    dispatchFetchItem: () => dispatch(fetchItems('1', false)),
    dispatchReset: () => {
      dispatch(reset());
    },
    dispatchDelete,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
