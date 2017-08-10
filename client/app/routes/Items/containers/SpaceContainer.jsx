import { connect } from 'react-redux';

import { CATEGORY_SPACE_ID } from 'constants/enums';
import { mapCategoryNameByID } from 'lib/category';

import Items from '../components/Items';
import { fetchRecords, reset } from '../modules/items';

/* pick props */
const mapStateToProps = ({ environment, items }) => ({
  environment,
  items,
  categoryName: mapCategoryNameByID(CATEGORY_SPACE_ID),
  categoryID: CATEGORY_SPACE_ID,
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchRecords: () => dispatch(fetchRecords(CATEGORY_SPACE_ID)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
