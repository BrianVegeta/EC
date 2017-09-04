import { connect } from 'react-redux';
import { mapCategoryNameByID, findTopCategory } from 'lib/category';
import { mappingIDFromCategory } from 'constants/enums';
import Items from '../components/Items';
import { fetchRecords, reset } from '../modules/items';


/* pick props */
const mapStateToProps = ({
  environment, items, categories,
}, {
  params: { cid },
}) => {
  const topCategory = findTopCategory(cid, categories);
  return ({
    environment,
    items,
    categoryName: mapCategoryNameByID(cid, categories),
    topCategoryID: mappingIDFromCategory[topCategory],
    categoryID: cid,
    filterType: topCategory,
  });
};

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params: { cid } }) => ({
  dispatchFetchRecords: () => dispatch(fetchRecords(cid)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
