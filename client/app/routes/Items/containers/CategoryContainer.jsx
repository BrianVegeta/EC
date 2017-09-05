import { connect } from 'react-redux';
import { mapCategoryNameByID, findTopCategory } from 'lib/category';
import { fetchCollections } from 'modules/myCollection';
import { mappingIDFromCategory } from 'constants/enums';
import Items from '../components/Items';
import { fetchRecords, reset } from '../modules/items';


/* pick props */
const mapStateToProps = ({
  environment, items, categories, auth,
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
    isLogin: auth.isLogin,
  });
};

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params: { cid } }) => ({
  dispatchFetchRecords: () => dispatch(fetchRecords(cid)),
  dispatchReset: () => dispatch(reset()),
  dispatchCollection: () => dispatch(fetchCollections()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
