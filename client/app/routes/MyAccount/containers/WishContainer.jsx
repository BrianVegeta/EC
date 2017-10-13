import { connect } from 'react-redux';
import { popupShowWish } from 'modules/popup';
import { swalDropWish } from 'lib/swal';
import WishList from '../components/Wish';
import { fetchRecords, reset, remove } from '../modules/myWish';

/* pick props */
const mapStateToProps = ({ environment, myWish }) => ({
  environment, myWish,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch) => {
  // dispatch remove
  const dispatchRemove = id =>
    swalDropWish().then(() => {
      dispatch(remove(id));
    }).catch(() => {});

  return ({
    dispatchFetchRecords: () => dispatch(fetchRecords()),
    dispatchReset: () => dispatch(reset()),
    dispatchShow: options => dispatch(popupShowWish(options)),
    dispatchRemove,
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
