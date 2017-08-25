import { connect } from 'react-redux';
import { popupTwoButtons } from 'modules/popup';

import Container from '../components/Item';
import { fetchItems, deleteItem, reset } from '../modules/myItem';

const mapStateToProps = (state) => {
  const { environment, mine, myItem } = state;
  return ({ environment, mine, myItem });
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchFetchItem: catId => dispatch(fetchItems(catId)),
  dispatchReset: () => dispatch(reset()),
  dispatchDelete: (pid) => {
    const onAction = () => {
      dispatch(deleteItem(pid));
    };
    dispatch(popupTwoButtons(
      {
        title: '確定下架此商品？',
        content: '下架之後即無法還原',
        rightBtnContent: '下架',
        onRightClick: onAction,
        leftBtnContent: '取消',
        onLeftClick: () => {},
      },
    ));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
