import { connect } from 'react-redux';
import {
  changePrice,
  changeSort,
  changeLocation,
  changeSendOption,
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
  dispatchChangePriceMax: price => dispatch(changePrice({ max: price })),
  dispatchChangePriceMin: price => dispatch(changePrice({ min: price })),
  dispatchChangeSort: sortType => dispatch(changeSort(sortType)),
  dispatchChangeLocation: location => dispatch(changeLocation(location)),
  dispatchChangeSendOption: sendOption => dispatch(changeSendOption(sendOption)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
