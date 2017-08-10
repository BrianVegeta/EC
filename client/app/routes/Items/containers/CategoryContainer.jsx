import { connect } from 'react-redux';

import { mapCategoryNameByID } from 'lib/category';

import Items from '../components/Items';
import { fetchRecords, reset } from '../modules/items';


/* pick props */
const mapStateToProps = ({ environment, items, options: { categories } }, { params: { cid } }) => ({
  environment,
  items,
  categoryName: mapCategoryNameByID(cid, categories),
  categoryID: cid,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params: { cid } }) => ({
  dispatchFetchRecords: () => dispatch(fetchRecords(cid)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
