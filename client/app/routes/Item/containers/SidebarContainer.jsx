import { connect } from 'react-redux';
import { addToCollection, removeFromCollection } from 'modules/myCollection';
import { setCollection } from '../modules/item';

import Sidebar from '../components/Sidebar';

/* pick props */
const mapStateToProps = ({ environment, item, auth: { currentUser, isLogin } }) => {
  const { detail } = item;
  return ({
    environment,
    isMyOwn: currentUser.uid === detail.uid,
    itemDetail: detail,
    isLogin,
  });
};

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatch,
  dispatchAddFavorite: pid =>
    dispatch(addToCollection(
      pid,
      () => {},
      () => dispatch(setCollection(true)),
    )),
  dispatchRemoveFavorite: pid =>
    dispatch(removeFromCollection(
      pid,
      () => {},
      () => dispatch(setCollection(false)),
    )),
});


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
