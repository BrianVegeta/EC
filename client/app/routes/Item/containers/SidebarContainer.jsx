import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';

/* pick props */
const mapStateToProps = ({ environment, item, auth: { currentUser } }) => {
  const { uid } = item;
  return ({
    environment,
    isMyOwn: currentUser.uid === uid,
    item,
  });
};

/* pick dispatch */
// const mapDispatchToProps = dispatch => ({
//   dispatchReset: () => {
//     dispatch(resetCovers());
//     dispatch(resetCropper());
//     dispatch(resetPublish());
//   },
//   dispatchFetchCategories: () => dispatch(fetchCategories()),
//   dispatchFetchCities: () => dispatch(fetchCities()),
// });

export default connect(mapStateToProps)(Sidebar);
