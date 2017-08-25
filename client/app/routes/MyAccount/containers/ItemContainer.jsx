import { connect } from 'react-redux';
// import { popupTwoButtons } from 'modules/popup';
import swal, { confirmConfig } from 'lib/swal';
// TODO: move to layout

import Container from '../components/Item';
import { fetchItems, deleteItem, reset } from '../modules/myItem';

const mapStateToProps = (state) => {
  const { environment, mine, myItem } = state;
  return ({ environment, mine, myItem });
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
    dispatchFetchItem: catId => dispatch(fetchItems(catId)),
    dispatchReset: () => dispatch(reset()),
    dispatchDelete,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
