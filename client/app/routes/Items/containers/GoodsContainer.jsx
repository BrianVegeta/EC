import { connect } from 'react-redux';
import { fetchCollections } from 'modules/myCollection';
import { CATEGORY_GOODS_ID, CATEGORY_GOODS } from 'constants/enums';
import { mapCategoryNameByID } from 'lib/category';

import Items from '../components/Items';
import { fetchRecords, reset } from '../modules/items';

/* pick props */
const mapStateToProps = ({ environment, items, auth }) => ({
  environment,
  items,
  categoryName: mapCategoryNameByID(CATEGORY_GOODS_ID),
  categoryID: CATEGORY_GOODS_ID,
  filterType: CATEGORY_GOODS,
  isLogin: auth.isLogin,
  isUsed: false,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchRecords: isUsed => dispatch(fetchRecords(CATEGORY_GOODS_ID, isUsed)),
  dispatchReset: () => dispatch(reset()),
  dispatchCollection: () => dispatch(fetchCollections()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
