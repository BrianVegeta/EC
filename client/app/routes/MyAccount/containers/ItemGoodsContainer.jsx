import { connect } from 'react-redux';
// import { popupTwoButtons } from 'modules/popup';
import swal, { confirmConfig } from 'lib/swal';
// TODO: move to layout
// import { reset as resetMine } from 'actions/mineActions';
import Container from '../components/Item/Goods';
import { fetchItems, deleteItem, reset } from '../modules/myItem';

const mapStateToProps = (state) => {
  const { environment, myItem } = state;
  return ({ environment, myItem });
};

const mapDispatchToProps = (dispatch) => {
  const dispatchDelete = (pid) => {
    // const { showAlert } = swal;
    swal(confirmConfig({
      title: '確定下架此商品？',
      text: '下架之後即無法還原',
      confirmButtonText: '下架',
    })).then(() => {
      dispatch(deleteItem(pid));
    }, () => {});
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
