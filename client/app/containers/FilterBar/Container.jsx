import { connect } from 'react-redux';
import { popupFilter } from 'modules/popup';
import {
  changePrice,
  changeSort,
  changeSendOption,
  setLocations,
  reset,
} from 'modules/filter';
import FilterBar, { FILTER_TYPE_WISH } from './index';

/* pick props */
const mapStateToProps = ({ environment, filter }) => ({
  environment,
  filter,
});

/* pick dispatch */
const mapDispatchToProps = (dispatch, { refetch }) => ({
  openFilter: () => dispatch(popupFilter()),
  dispatchChangePrice: ({ min, max }) => dispatch(changePrice({ min, max })),
  dispatchChangeSort: ({ sort }) => dispatch(changeSort(sort)),
  dispatchChangeSendOption: ({ sendOption }) =>
    dispatch(changeSendOption(sendOption)),
  dispatchSetLocations: locations => dispatch(setLocations(locations)),
  dispatchReset: () => dispatch(reset()),
  refetch,
});

export {
  FILTER_TYPE_WISH,
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
