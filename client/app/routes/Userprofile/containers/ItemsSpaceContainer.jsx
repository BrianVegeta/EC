import { connect } from 'react-redux';
import { CATEGORY_SPACE, CATEGORY_SPACE_ID } from 'constants/enums';

import Items from '../components/Items';
import { fetchItems, reset } from '../modules/userprofileItems';

/* pick props */
const mapStateToProps = ({ environment, userprofileItems }) => ({
  environment, userprofileItems, category: CATEGORY_SPACE,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetchItems: () => dispatch(fetchItems(CATEGORY_SPACE_ID, params.uid)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
