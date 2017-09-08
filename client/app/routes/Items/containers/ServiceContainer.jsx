import { connect } from 'react-redux';

import { CATEGORY_SERVICE_ID, CATEGORY_SERVICE } from 'constants/enums';
import { mapCategoryNameByID } from 'lib/category';
import { fetchCollections } from 'modules/myCollection';
import Items from '../components/Items';
import { fetchRecords, reset } from '../modules/items';

/* pick props */
const mapStateToProps = ({ environment, items, auth }) => ({
  environment,
  items,
  categoryName: mapCategoryNameByID(CATEGORY_SERVICE_ID),
  categoryID: CATEGORY_SERVICE_ID,
  filterType: CATEGORY_SERVICE,
  isLogin: auth.isLogin,
  isUsed: false,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchRecords: isUsed => dispatch(fetchRecords(CATEGORY_SERVICE_ID, isUsed)),
  dispatchReset: () => dispatch(reset()),
  dispatchCollection: () => dispatch(fetchCollections()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
