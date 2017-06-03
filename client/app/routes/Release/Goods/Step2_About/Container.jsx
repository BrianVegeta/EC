import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CSS from 'react-css-modules';
import { browserHistory } from 'react-router';
import styles from './styles.sass';

import NextController from '../../components/NextController';
import FormGroup from '../../components/FormGroup';
import InputCounter from '../../components/InputCounter';
import InputTextarea from '../../components/InputTextarea';
import InputTags from '../../components/InputTags';
import SelectionCategory from '../../components/SelectionCategory';
import { TITLE, ABOUT } from '../../constants';
import {
  TitleWrapper,
  InputTextWithError,
  InputSelectionCities,
  InputCounterWithError,
  IntervalLine,
  NextStep,
} from '../../components';
import {
  updateTitle,
  updateDesc,
  updateTags,
} from '../../../../actions/publishActions';
import { fetchZones, fetchCities } from '../../../../actions/addressActions';


class Container extends React.Component {
  static saveAndNext() {
    browserHistory.push('/p/release-goods/s3_d');
  }
  static propTypes = {
    publish: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
      ]),
    ).isRequired,
    cities: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    items: PropTypes.shape({
      categories: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  static renderLimiter(limiter, limit) {
    return (
      <span>
        <span className={limiter.isOverLimit && styles.limitError}>
          {limiter.length}
        </span>/{limit}
      </span>
    );
  }
  constructor(props) {
    super(props);
    this.onDescChange = this.onDescChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onFetchZones = this.onFetchZones.bind(this);
    this.onCitiesChange = this.onCitiesChange.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(fetchCities());
  }
  onDescChange(value) {
    this.props.dispatch(updateDesc(value));
  }
  onTitleChange(value) {
    this.props.dispatch(updateTitle(value));
  }
  onTagsChange(values) {
    this.props.dispatch(updateTags(values));
  }
  onFetchZones(cityName) {
    this.props.dispatch(fetchZones(cityName));
  }
  onCitiesChange(cityName, areaName) {
    console.log(cityName, areaName);
  }
  render() {
    const { categories } = this.props.items;
    const { title, descript, hashtags } = this.props.publish;
    const { renderLimiter } = this.constructor;
    const titleProps = {
      placeholder: ABOUT.TITLE_PLACEHOLDER,
      onChange: this.onTitleChange,
      value: title.value,
    };
    const descProps = {
      placeholder: ABOUT.DESC_PLACEHOLDER,
      onChange: this.onDescChange,
      value: descript.value,
    };
    const tagProps = {
      placeholder: ABOUT.TAG_PLACEHOLDER,
      onChange: this.onTagsChange,
      values: hashtags,
    };
    const categoriesProps = {
      categories: categories.goods,
      placeholder: ABOUT.CATEGORY_PLACEHOLDER,
    };
    const citiesProps = {
      cities: this.props.cities,
      placeholder: ABOUT.CITIES_PLACEHOLDER,
      onSelect: this.onCitiesChange,
      onFetchZones: this.onFetchZones,
      cityName: '',
      areaName: '',
    };
    const amountProps = {
      value: 1,
      suffix: ABOUT.AMOUNT_UNIT,
      width: 152,
    };
    return (
      <div styleName="container">
        <TitleWrapper>{TITLE.ABOUT}</TitleWrapper>
        <FormGroup headerText={ABOUT.TITLE_LABEL} limiter={renderLimiter(title, 30)} >
          <InputTextWithError {...titleProps} />
        </FormGroup>
        <FormGroup headerText={ABOUT.DESC_LABEL} limiter={renderLimiter(descript, 250)} >
          <InputTextarea {...descProps} />
        </FormGroup>
        <div>
          <div style={{ width: 320, display: 'inline-block' }}>
            <FormGroup headerText={ABOUT.CITIES_LABEL}>
              <InputSelectionCities {...citiesProps} />
            </FormGroup>
          </div>
          <div style={{ display: 'inline-block' }}>
            <FormGroup headerText={ABOUT.AMOUNT_LABEL}>
              <InputCounterWithError {...amountProps} />
            </FormGroup>
          </div>
        </div>
        <FormGroup headerText={ABOUT.TAG_LABEL}>
          <InputTags {...tagProps} />
        </FormGroup>
        <FormGroup headerText={ABOUT.CATEGORY_LABEL}>
          <SelectionCategory {...categoriesProps} />
        </FormGroup>
        <NextController next={this.constructor.saveAndNext} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { environment, routesHelper, items, publish, cities } = state;
  return ({ environment, routesHelper, items, publish, cities });
};
export default connect(mapStateToProps)(CSS(Container, styles));
