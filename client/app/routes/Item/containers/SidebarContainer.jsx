import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';

/* pick props */
const mapStateToProps = ({ environment, item, auth: { currentUser } }) => {
  const { detail } = item;
  return ({
    environment,
    isMyOwn: currentUser.uid === detail.uid,
    itemDetail: detail,
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
