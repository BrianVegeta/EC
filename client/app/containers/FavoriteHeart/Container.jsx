import { connect } from 'react-redux';

import { addToCollection, removeFromCollection } from 'modules/myCollection';

import Component from './Component';


/* pick props */
const mapStateToProps = ({ environment, myCollection, auth }) => ({
  environment, myCollection, isLogin: auth.isLogin
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchAddFavorite: (pid, waiting, actionDone) =>
  dispatch(addToCollection(pid, waiting, actionDone)),
  dispatchRemoveFavorite: (pid, waiting, actionDone) =>
  dispatch(removeFromCollection(pid, waiting, actionDone)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
