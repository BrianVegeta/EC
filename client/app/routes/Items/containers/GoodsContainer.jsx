import { connect } from 'react-redux';

import { CATEGORY_GOODS_ID, CATEGORY_GOODS } from 'constants/enums';
import { mapCategoryNameByID } from 'lib/category';

import Items from '../components/Items';
import { fetchRecords, reset } from '../modules/items';

/* pick props */
const mapStateToProps = ({ environment, items }) => ({
  environment,
  items,
  categoryName: mapCategoryNameByID(CATEGORY_GOODS_ID),
  categoryID: CATEGORY_GOODS_ID,
  filterType: CATEGORY_GOODS,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchRecords: () => dispatch(fetchRecords(CATEGORY_GOODS_ID)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
