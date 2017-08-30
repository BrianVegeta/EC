// @author: vincent
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CSS from 'react-css-modules';
import styles from './styles.sass';

import Cards from './Cards';
import Header from './Header';
import { updateCategory, updateCityArea } from '../../actions/publishActions';
import { fetchZones } from '../../actions/addressActions';
import { fetchWish } from '../../actions/wishActions';

class TanzakuContainer extends React.Component {
  static defaultProps={
    dispatch: null,
    wish: null,
  }

  static propTypes={
    dispatch: PropTypes.func,
    wish: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  constructor(props) {
    super(props);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onFetchZones = this.onFetchZones.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchWish());
  }

  onCategoryChange(category) {
    this.props.dispatch(updateCategory(category.id));
  }

  onFetchZones(cityName) {
    this.props.dispatch(fetchZones(cityName));
  }

  onCitiesChange(cityName, areaName) {
    this.props.dispatch(updateCityArea(cityName, areaName));
  }

  fetchMore() {
    this.props.dispatch(fetchWish());
  }

  render() {
    const { wish } = this.props;
    const { isFetching, isWithout } = wish;
    return (
      <div>
        <Header />
        <Cards cards={wish.records} />
        { !isWithout &&
          <button
            className="button"
            styleName="loadButton"
            onClick={isFetching ? null : () => this.fetchMore()}
          >
            {isFetching ? 'Loading' : '載入更多'}
          </button>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { wish } = state;
  return ({ wish });
};
export default connect(mapStateToProps)(CSS(TanzakuContainer, styles));
