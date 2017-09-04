import React from 'react';
import PropTypes from 'prop-types';
import FilterPriceRange from 'components/Filter/PriceRange';
import FilterSort from 'components/Filter/Sort';
import FilterSendOption from 'components/Filter/SendOption';
import FilterLocations from 'components/Filter/Locations';
import {
  CATEGORY_GOODS,
  CATEGORY_SERVICE,
  CATEGORY_SPACE,
} from 'constants/enums';
import CSS from 'react-css-modules';
import styles from './styles.sass';


export const FILTER_TYPE_WISH = 'wish';
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
    dispatchReset: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,

    filter: PropTypes.shape({
      price: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number,
      }).isRequired,
    }).isRequired,
    filterType: PropTypes.oneOf([
      CATEGORY_GOODS,
      CATEGORY_SERVICE,
      CATEGORY_SPACE,
      FILTER_TYPE_WISH,
    ]).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      opening: null,
    };
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onSendOptionChange = this.onSendOptionChange.bind(this);
    this.onLocationsSet = this.onLocationsSet.bind(this);
  }

  componentDidMount() {
    this.props.dispatchReset();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  onFilterToggle(opening) {
    if (opening === this.state.opening) {
      this.setState({ opening: null });
    } else {
      this.setState({ opening });
    }
  }

  onPriceChange({ max, min }) {
    this.props.dispatchChangePrice({ max, min });
    this.props.refetch();
  }

  onSortChange(sort) {
    this.props.dispatchChangeSort(sort);
    this.props.refetch();
  }

  onSendOptionChange(sendOption) {
    this.props.dispatchChangeSendOption(sendOption);
    this.props.refetch();
  }

  onLocationsSet(locations) {
    this.props.dispatchSetLocations(locations);
    this.props.refetch();
  }

  renderPrice() {
    const {
      filter: { price: { min, max } },
    } = this.props;
    const { opening } = this.state;
    return (
      <div styleName="filter-btn">
        <FilterPriceRange
          price={{ min, max }}
          isOpening={opening === PRICE_OPENING}
          onButtonToggle={() => this.onFilterToggle(PRICE_OPENING)}
          onApplyChange={this.onPriceChange}
        />
      </div>
    );
  }

  renderSort() {
    const { filter: { sort } } = this.props;
    const { opening } = this.state;
    return (
      <div styleName="filter-btn">
        <FilterSort
          sort={sort}
          isOpening={opening === SORT_OPENING}
          onButtonToggle={() => this.onFilterToggle(SORT_OPENING)}
          onApplyChange={this.onSortChange}
        />
      </div>
    );
  }

  renderSendOption() {
    const { filter: { sendOption } } = this.props;
    const { opening } = this.state;
    return (
      <div styleName="filter-btn">
        <FilterSendOption
          sendOption={sendOption}
          isOpening={opening === SEND_OPTION_OPENING}
          onButtonToggle={() => this.onFilterToggle(SEND_OPTION_OPENING)}
          onApplyChange={this.onSendOptionChange}
        />
      </div>
    );
  }

  renderLocations() {
    const { filter: { locations } } = this.props;
    const { opening } = this.state;
    return (
      <div styleName="filter-btn">
        <FilterLocations
          locations={locations}
          isOpening={opening === LOCATION_OPENING}
          onButtonToggle={() => this.onFilterToggle(LOCATION_OPENING)}
          onApplyChange={this.onLocationsSet}
        />
      </div>
    );
  }

  render() {
    const { filterType } = this.props;
    switch (filterType) {
      case CATEGORY_GOODS:
        return (
          <div styleName="container" className="clear">
            {this.renderPrice()}
            {this.renderSort()}
            {this.renderSendOption()}
            {this.renderLocations()}
          </div>
        );
      case CATEGORY_SERVICE:
        return (
          <div styleName="container" className="clear">
            {this.renderPrice()}
            {this.renderSort()}
            {this.renderLocations()}
          </div>
        );
      case CATEGORY_SPACE:
        return (
          <div styleName="container" className="clear">
            {this.renderPrice()}
            {this.renderSort()}
            {this.renderLocations()}
          </div>
        );
      case FILTER_TYPE_WISH:
        return (
          <div styleName="container" className="clear">
            {this.renderLocations()}
          </div>
        );
      default:
        return null;
    }
  }
}

export default CSS(FilterBar, styles);
