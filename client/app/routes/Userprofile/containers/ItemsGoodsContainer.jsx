import { connect } from 'react-redux';
import { CATEGORY_GOODS_ID, CATEGORY_GOODS } from 'constants/enums';

import Items from '../components/Items';
import { fetchItems, reset } from '../modules/userprofileItems';

/* pick props */
const mapStateToProps = ({ environment, userprofileItems, auth }) => ({
  environment, userprofileItems, category: CATEGORY_GOODS, isLogin: auth.isLogin,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { params }) => ({
  dispatchFetchItems: () => dispatch(fetchItems(CATEGORY_GOODS_ID, params.uid)),
  dispatchReset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Items);
