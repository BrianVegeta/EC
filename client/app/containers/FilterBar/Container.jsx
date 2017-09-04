import { connect } from 'react-redux';
import { popupFilter } from 'modules/popup';
import {
  changePrice,
  changeSort,
  changeSendOption,
  setLocations,
} from 'modules/filter';
import FilterBar from './index';

/* pick props */
const mapStateToProps = ({ environment, filter }) => {
  return ({
    environment,
    filter,
  });
};

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  openFilter: () => dispatch(popupFilter()),
  dispatchChangePrice: ({ min, max }) => dispatch(changePrice({ min, max })),
  dispatchChangeSort: ({ sort }) => dispatch(changeSort(sort)),
  dispatchChangeSendOption: ({ sendOption }) =>
    dispatch(changeSendOption(sendOption)),
  dispatchSetLocations: locations => dispatch(setLocations(locations)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
