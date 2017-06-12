import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import InputTags from '../../components/InputTags';
import { TITLE, PATH } from '../constants';
import {
  FormGroup,
  TitleWrapper,
  InputTextWithError,
  InputTextareaWithError,
  InputSelectionCitiesWithError,
  InputSelectionCatesWithError,
  AlertPanel,
  NextStep,
} from '../../components';
import Model from '../Model';


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
  static renderLimiter(limiter) {
    return (
      <span>
        <span className={classbindings({ limitError: limiter.isOverLimit })}>
          {limiter.length}
        </span>/{limiter.limit}
      </span>
    );
  }
  constructor(props) {
    super(props);
    this.validateAll = this.validateAll.bind(this);
    this.state = { tagsError: null };
  }
  componentDidMount() {
    const { publish, dispatch } = this.props;
    const { cityarea } = new Model(publish, dispatch);
    cityarea.fetchCities();
  }
  validTags() {
    const { tags } = new Model(this.props.publish, this.props.dispatch);
    const errors = tags.validator();
    this.setState({ tagsError: errors[0] });
  }
  validateAll() {
    this.titleInput.valid();
    this.descInput.valid();
    this.citiesInput.valid();
    this.validTags();
    this.categoryInput.valid();
  }
  isValid() {
    const {
      title,
      descript,
      cityarea,
      category,
      tags,
    } = new Model(this.props.publish, this.props.dispatch);
    return title.isValid() &&
      descript.isValid() &&
      cityarea.isValid() &&
      category.isValid() &&
      tags.isValid();
  }
  render() {
    const { categories } = this.props.items;
    const { renderLimiter } = this.constructor;
    const { tagsError } = this.state;
    const { publish, dispatch } = this.props;
    const {
      title,
      descript,
      cityarea,
      category,
      tags,
    } = new Model(publish, dispatch);
    return (
      <div styleName="container">
        <TitleWrapper>{TITLE.ABOUT}</TitleWrapper>
        <FormGroup headerText={'服務名稱'} limiter={renderLimiter(title)} >
          <InputTextWithError
            {...{
              ref: input => (this.titleInput = input),
              placeholder: '請輸入',
              onChange: title.update,
              value: title.value,
              validator: title.validator,
            }}
          />
        </FormGroup>
        <FormGroup headerText={'服務描述'} limiter={renderLimiter(descript)} >
          <InputTextareaWithError
            {...{
              ref: input => (this.descInput = input),
              placeholder: '清楚介紹您的服務，敘述更多吸引人的細節',
              onChange: descript.update,
              value: descript.value,
              validator: descript.validator,
            }}
          />
        </FormGroup>
        <div styleName="group">
          <div styleName="cities">
            <FormGroup headerText={'服務地區'}>
              <InputSelectionCitiesWithError
                {...{
                  ref: input => (this.citiesInput = input),
                  cities: this.props.cities,
                  placeholder: '城市/地區',
                  onSelect: cityarea.update,
                  onFetchZones: cityarea.fetchZones,
                  cityName: cityarea.city,
                  areaName: cityarea.area,
                  validator: cityarea.validator,
                }}
              />
            </FormGroup>
          </div>
        </div>
        <FormGroup headerText={'分類'}>
          <InputSelectionCatesWithError
            {...{
              ref: input => (this.categoryInput = input),
              categories: categories.service,
              categoryId: category.id,
              placeholder: '請選擇分類',
              onChange: category.update,
              validator: category.validator,
            }}
          />
        </FormGroup>
        <FormGroup headerText={'加入 #標籤'}>
          <InputTags
            {...{
              placeholder: '標籤',
              onChange: tags.update,
              values: tags.hashtags,
            }}
          />
          {tagsError && <AlertPanel message={tagsError} />}
        </FormGroup>
        <NextStep
          {...{
            onNext: this.constructor.saveAndNext,
            onValid: this.validateAll,
            isDisabled: !this.isValid(),
          }}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { environment, routesHelper, items, publish, cities } = state;
  return ({ environment, routesHelper, items, publish, cities });
};
export default connect(mapStateToProps)(CSS(Container, styles));
