import { connect } from 'react-redux';

import { CATEGORY_SERVICE_ID } from 'constants/enums';
import { mapCategoryNameByID } from 'lib/category';

import Items from '../components/Items';
import { fetchRecords, reset } from '../modules/items';

/* pick props */
const mapStateToProps = ({ environment, items }) => ({
  environment,
  items,
  categoryName: mapCategoryNameByID(CATEGORY_SERVICE_ID),
  categoryID: CATEGORY_SERVICE_ID,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchRecords: () => dispatch(fetchRecords(CATEGORY_SERVICE_ID)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
