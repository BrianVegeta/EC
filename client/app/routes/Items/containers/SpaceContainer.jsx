import { connect } from 'react-redux';

import { CATEGORY_SPACE_ID, CATEGORY_SPACE } from 'constants/enums';
import { mapCategoryNameByID } from 'lib/category';
import { fetchCollections } from 'modules/myCollection';
import Items from '../components/Items';
import { fetchRecords, reset } from '../modules/items';

/* pick props */
const mapStateToProps = ({ environment, items, auth }) => ({
  environment,
  items,
  categoryName: mapCategoryNameByID(CATEGORY_SPACE_ID),
  categoryID: CATEGORY_SPACE_ID,
  filterType: CATEGORY_SPACE,
  isLogin: auth.isLogin,
  isUsed: false,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchRecords: isUsed => dispatch(fetchRecords(CATEGORY_SPACE_ID, isUsed)),
  dispatchReset: () => dispatch(reset()),
  dispatchCollection: () => dispatch(fetchCollections()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
