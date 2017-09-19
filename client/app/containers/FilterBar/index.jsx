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

  onFilterClose(OPEN_TAG) {
    if (OPEN_TAG === this.state.opening) {
      this.setState({ opening: null });
    }
  }

  onFilterOpen(OPENING_TAG) {
    if (OPENING_TAG !== this.state.opening) {
      this.setState({ opening: OPENING_TAG });
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
    const openTag = PRICE_OPENING;
    const { filter: { price: { min, max } } } = this.props;
    const { opening } = this.state;
    return (
      <div styleName="filter-btn">
        <FilterPriceRange
          price={{ min, max }}
          onApplyChange={this.onPriceChange}
          isOpening={opening === openTag}
          openFilter={() => this.onFilterOpen(openTag)}
          closeFilter={() => this.onFilterClose(openTag)}
        />
      </div>
    );
  }

  renderSort() {
    const openTag = SORT_OPENING;
    const { filter: { sort } } = this.props;
    const { opening } = this.state;
    return (
      <div styleName="filter-btn">
        <FilterSort
          sort={sort}
          onApplyChange={this.onSortChange}
          isOpening={opening === openTag}
          openFilter={() => this.onFilterOpen(openTag)}
          closeFilter={() => this.onFilterClose(openTag)}
        />
      </div>
    );
  }

  renderSendOption() {
    const openTag = SEND_OPTION_OPENING;
    const { filter: { sendOption } } = this.props;
    const { opening } = this.state;
    return (
      <div styleName="filter-btn">
        <FilterSendOption
          sendOption={sendOption}
          onApplyChange={this.onSendOptionChange}
          isOpening={opening === openTag}
          openFilter={() => this.onFilterOpen(openTag)}
          closeFilter={() => this.onFilterClose(openTag)}
        />
      </div>
    );
  }

  renderLocations() {
    const openTag = LOCATION_OPENING;
    const { filter: { locations } } = this.props;
    const { opening } = this.state;
    return (
      <div styleName="filter-btn">
        <FilterLocations
          locations={locations}
          onApplyChange={this.onLocationsSet}
          isOpening={opening === openTag}
          openFilter={() => this.onFilterOpen(openTag)}
          closeFilter={() => this.onFilterClose(openTag)}
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
