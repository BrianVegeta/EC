import { connect } from 'react-redux';
import { addToCollection, removeFromCollection } from 'modules/myCollection';
import { popupReport } from 'modules/popup';
import { setCollection, checkItemOngoing } from '../modules/item';
import Sidebar from '../components/Sidebar';

/* pick props */
const mapStateToProps = ({
  environment, item, auth: { currentUser, isLogin },
}) => {
  const { detail } = item;
  return ({
    environment,
    isMyOwn: currentUser.uid === detail.uid,
    itemDetail: detail,
    isLogin,
  });
};

/* pick dispatch */
const mapDispatchToProps = (dispatch, { pid }) => ({
  dispatch,
  dispatchReport: () => dispatch(popupReport({ pid })),
  dispatchAddFavorite: () =>
    dispatch(addToCollection(
      pid,
      () => {},
      () => dispatch(setCollection(true)),
    )),
  dispatchRemoveFavorite: () =>
    dispatch(removeFromCollection(
      pid,
      () => {},
      () => dispatch(setCollection(false)),
    )),
  dispatchCheckItemOngoing: () => dispatch(checkItemOngoing(pid)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
