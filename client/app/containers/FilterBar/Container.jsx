import { connect } from 'react-redux';
import { fetchCategories } from 'modules/categories';
import {
  changePrice,
  changeSort,
  changeSendOption,
  setLocations,
  changeCategory,
  reset,
} from 'modules/filter';
import FilterBar, { FILTER_TYPE_WISH } from './index';

/* pick props */
const mapStateToProps = ({ environment, filter, categories }) => ({
  environment,
  filter,
  categories,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { refetch }) => ({
  dispatchFetchCategories: () => dispatch(fetchCategories()),
  dispatchChangePrice: ({ min, max }) => dispatch(changePrice({ min, max })),
  dispatchChangeSort: ({ sort }) => dispatch(changeSort(sort)),
  dispatchChangeSendOption: ({ sendOption }) =>
    dispatch(changeSendOption(sendOption)),
  dispatchSetLocations: locations => dispatch(setLocations(locations)),
  dispatchChangeCategory: categoryId => dispatch(changeCategory(categoryId)),
  dispatchReset: () => dispatch(reset()),
  refetch,
});

export {
  FILTER_TYPE_WISH,
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
