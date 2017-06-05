import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import validate from 'validate.js';
import classnames from 'classnames/bind';
import _ from 'lodash';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import constraints from './constraints';

import FormGroup from '../../components/FormGroup';
import InputTags from '../../components/InputTags';
// import InputSelectionCates from '../../components/InputSelectionCates';
import { TITLE, ABOUT, PATH } from '../../constants';
import {
  TitleWrapper,
  InputTextWithError,
  InputTextareaWithError,
  InputSelectionCitiesWithError,
  InputSelectionCatesWithError,
  InputCounterWithError,
  AlertPanel,
  NextStep,
} from '../../components';
import {
  updateTitle,
  updateDesc,
  updateCityArea,
  updateAmount,
  updateTags,
  updateCategory,
} from '../../../../actions/publishActions';
import { fetchZones, fetchCities } from '../../../../actions/addressActions';


const classbindings = classnames.bind(styles);
class Container extends React.Component {
  static saveAndNext() {
    browserHistory.push(PATH.STEP_3_DELIVERY);
  }
  static propTypes = {
    publish: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
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
        <span className={classbindings({ limitError: limiter.isOverLimit })}>
          {limiter.length}
        </span>/{limit}
      </span>
    );
  }
  constructor(props) {
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescChange = this.onDescChange.bind(this);
    this.onCitiesChange = this.onCitiesChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onFetchZones = this.onFetchZones.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);

    this.titleValidator = this.titleValidator.bind(this);
    this.descValidator = this.descValidator.bind(this);
    this.citiesValidator = this.citiesValidator.bind(this);
    this.amountValidator = this.amountValidator.bind(this);
    this.categoryValidator = this.categoryValidator.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.state = {
      tagsError: null,
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchCities());
  }
  onDescChange(value) {
    this.props.dispatch(updateDesc(value));
  }
  onFetchZones(cityName) {
    this.props.dispatch(fetchZones(cityName));
  }
  onCitiesChange(cityName, areaName) {
    this.props.dispatch(updateCityArea(cityName, areaName));
  }
  onAmountChange(amount) {
    this.props.dispatch(updateAmount(amount));
  }
  onTitleChange(value) {
    this.props.dispatch(updateTitle(value));
  }
  onTagsChange(values) {
    this.props.dispatch(updateTags(values));
  }
  onCategoryChange(category) {
    this.props.dispatch(updateCategory(category.id));
  }
  validator(name, isDeepValue = false) {
    const { publish } = this.props;
    const valueToValid = isDeepValue ? publish[name].value : publish[name];
    return validate.single(valueToValid, constraints[name]);
  }
  titleValidator() {
    return this.validator('title', true);
  }
  descValidator() {
    return this.validator('descript', true);
  }
  citiesValidator() {
    const { publish } = this.props;
    return validate.single(`${publish.city}${publish.area}`, constraints.cityarea);
  }
  amountValidator() {
    return this.validator('amount');
  }
  categoryValidator() {
    return this.validator('categoryId');
  }
  validTags() {
    const { tags } = this.props.publish;
    const tagsError = _.isEmpty(_.compact(tags)) ? '至少填一個標籤' : null;
    this.setState({ tagsError });
  }
  isAllValid() {
    const isTitleValid = _.isEmpty(this.titleValidator());
    const isDescValid = _.isEmpty(this.descValidator());
    const isCitiesValid = _.isEmpty(this.citiesValidator());
    const isAmountValid = _.isEmpty(this.amountValidator());

    const { tags } = this.props.publish;
    const isTagsValid = _.isEmpty(_.compact(tags));
    const isCategoryValid = _.isEmpty(this.categoryValidator());
    return isTitleValid
      && isDescValid
      && isCitiesValid
      && isAmountValid
      && isTagsValid
      && isCategoryValid;
  }
  validateAll() {
    this.titleInput.valid();
    this.descInput.valid();
    this.citiesInput.valid();
    this.amountInput.valid();
    this.validTags();
    this.categoryInput.valid();
  }
  render() {
    const { categories } = this.props.items;
    const {
      title,
      descript,
      city,
      area,
      amount,
      hashtags,
      categoryId,
    } = this.props.publish;
    const { renderLimiter } = this.constructor;
    const titleProps = {
      ref: input => (this.titleInput = input),
      placeholder: ABOUT.TITLE_PLACEHOLDER,
      onChange: this.onTitleChange,
      value: title.value,
      validator: this.titleValidator,
    };
    const descProps = {
      ref: input => (this.descInput = input),
      placeholder: ABOUT.DESC_PLACEHOLDER,
      onChange: this.onDescChange,
      value: descript.value,
      validator: this.descValidator,
    };
    const tagsProps = {
      placeholder: ABOUT.TAG_PLACEHOLDER,
      onChange: this.onTagsChange,
      values: hashtags,
    };
    const categoryProps = {
      ref: input => (this.categoryInput = input),
      categories: categories.goods,
      categoryId,
      placeholder: ABOUT.CATEGORY_PLACEHOLDER,
      onChange: this.onCategoryChange,
      validator: this.categoryValidator,
    };
    const citiesProps = {
      ref: input => (this.citiesInput = input),
      cities: this.props.cities,
      placeholder: ABOUT.CITIES_PLACEHOLDER,
      onSelect: this.onCitiesChange,
      onFetchZones: this.onFetchZones,
      cityName: city,
      areaName: area,
      validator: this.citiesValidator,
    };
    const amountProps = {
      ref: input => (this.amountInput = input),
      value: amount,
      width: 152,
      suffix: ABOUT.AMOUNT_UNIT,
      onChange: this.onAmountChange,
      validator: this.amountValidator,
    };
    const nextStepProps = {
      onNext: this.constructor.saveAndNext,
      onValid: this.validateAll,
      isDisabled: !this.isAllValid(),
    };
    return (
      <div styleName="container">
        <TitleWrapper>{TITLE.ABOUT}</TitleWrapper>
        <FormGroup headerText={ABOUT.TITLE_LABEL} limiter={renderLimiter(title, 30)} >
          <InputTextWithError {...titleProps} />
        </FormGroup>
        <FormGroup headerText={ABOUT.DESC_LABEL} limiter={renderLimiter(descript, 250)} >
          <InputTextareaWithError {...descProps} />
        </FormGroup>
        <div styleName="group">
          <div styleName="cities">
            <FormGroup headerText={ABOUT.CITIES_LABEL}>
              <InputSelectionCitiesWithError {...citiesProps} />
            </FormGroup>
          </div>
          <div styleName="amount">
            <FormGroup headerText={ABOUT.AMOUNT_LABEL}>
              <InputCounterWithError {...amountProps} />
            </FormGroup>
          </div>
        </div>
        <FormGroup headerText={ABOUT.TAG_LABEL}>
          <InputTags {...tagsProps} />
          {this.state.tagsError &&
            <AlertPanel message={this.state.tagsError} />
          }
        </FormGroup>
        <FormGroup headerText={ABOUT.CATEGORY_LABEL}>
          <InputSelectionCatesWithError {...categoryProps} />
        </FormGroup>
        <NextStep {...nextStepProps} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { environment, routesHelper, items, publish, cities } = state;
  return ({ environment, routesHelper, items, publish, cities });
};
export default connect(mapStateToProps)(CSS(Container, styles));
