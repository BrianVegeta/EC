import React from 'react';
import PropTypes from 'prop-types';
import FilterPriceRange from 'components/Filter/PriceRange';
import FilterSort from 'components/Filter/Sort';
import FilterSendOption from 'components/Filter/SendOption';
import FilterLocations from 'components/Filter/Locations';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const PRICE_OPENING = 'PRICE_OPENING';
const SORT_OPENING = 'SORT_OPENING';
const SEND_OPTION_OPENING = 'SEND_OPTION_OPENING';
const LOCATION_OPENING = 'LOCATION_OPENING';
class FilterBar extends React.Component {

  static propTypes = {
    dispatchChangePrice: PropTypes.func.isRequired,
    dispatchChangeSort: PropTypes.func.isRequired,
    dispatchChangeSendOption: PropTypes.func.isRequired,
    dispatchSetLocations: PropTypes.func.isRequired,

    filter: PropTypes.shape({
      price: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number,
      }).isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      opening: null,
    };
  }

  onFilterToggle(opening) {
    if (opening === this.state.opening) {
      this.setState({ opening: null });
    } else {
      this.setState({ opening });
    }
  }

  render() {
    const {
      dispatchChangePrice,
      dispatchChangeSort,
      dispatchChangeSendOption,
      dispatchSetLocations,
      filter: {
        price: { min, max },
        sort,
        sendOption,
        locations,
      },
    } = this.props;
    const {
      opening,
    } = this.state;

    return (
      <div styleName="container" className="clear">
        <div styleName="filter-btn">
          <FilterPriceRange
            price={{ min, max }}
            isOpening={opening === PRICE_OPENING}
            onButtonToggle={() => this.onFilterToggle(PRICE_OPENING)}
            onApplyChange={dispatchChangePrice}
          />
        </div>
        <div styleName="filter-btn">
          <FilterSort
            sort={sort}
            isOpening={opening === SORT_OPENING}
            onButtonToggle={() => this.onFilterToggle(SORT_OPENING)}
            onApplyChange={dispatchChangeSort}
          />
        </div>
        <div styleName="filter-btn">
          <FilterSendOption
            sendOption={sendOption}
            isOpening={opening === SEND_OPTION_OPENING}
            onButtonToggle={() => this.onFilterToggle(SEND_OPTION_OPENING)}
            onApplyChange={dispatchChangeSendOption}
          />
        </div>
        <div styleName="filter-btn">
          <FilterLocations
            locations={locations}
            isOpening={opening === LOCATION_OPENING}
            onButtonToggle={() => this.onFilterToggle(LOCATION_OPENING)}
            onApplyChange={dispatchSetLocations}
          />
        </div>
      </div>
    );
  }
}

export default CSS(FilterBar, styles);
