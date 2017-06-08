import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import classnames from 'classnames/bind';
import _ from 'lodash';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import FormGroup from '../../components/FormGroup';
import InputTags from '../../components/InputTags';
import { TITLE, ABOUT, PATH } from '../constants';
import {
  TitleWrapper,
  InputTextWithError,
  InputTextareaWithError,
  InputSelectionCitiesWithError,
  InputSelectionCatesWithError,
  AlertPanel,
  NextStep,
} from '../../components';
import {
  updateTitle,
  updateDesc,
  updateCityArea,
  updateTags,
  updateCategory,
} from '../../../../actions/publishActions';
import { fetchZones, fetchCities } from '../../../../actions/addressActions';
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
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onFetchZones = this.onFetchZones.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
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
  onTitleChange(value) {
    this.props.dispatch(updateTitle(value));
  }
  onTagsChange(values) {
    this.props.dispatch(updateTags(values));
  }
  onCategoryChange(category) {
    this.props.dispatch(updateCategory(category.id));
  }
  validTags() {
    const { hashtags } = this.props.publish;
    const tagsError = _.isEmpty(_.compact(hashtags)) ? '至少填一個標籤' : null;
    this.setState({ tagsError });
  }
  validateAll() {
    this.titleInput.valid();
    this.descInput.valid();
    this.citiesInput.valid();
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
      hashtags,
      categoryId,
    } = this.props.publish;
    const { renderLimiter } = this.constructor;
    const model = new Model(this.props.publish);
    return (
      <div styleName="container">
        <TitleWrapper>{TITLE.ABOUT}</TitleWrapper>
        <FormGroup
          headerText={ABOUT.TITLE_LABEL}
          limiter={renderLimiter(title, 30)}
        >
          <InputTextWithError
            {...{
              ref: input => (this.titleInput = input),
              placeholder: ABOUT.TITLE_PLACEHOLDER,
              onChange: this.onTitleChange,
              value: title.value,
              validator: model.titleValidator,
            }}
          />
        </FormGroup>
        <FormGroup
          headerText={ABOUT.DESC_LABEL}
          limiter={renderLimiter(descript, 250)}
        >
          <InputTextareaWithError
            {...{
              ref: input => (this.descInput = input),
              placeholder: ABOUT.DESC_PLACEHOLDER,
              onChange: this.onDescChange,
              value: descript.value,
              validator: model.descValidator,
            }}
          />
        </FormGroup>
        <div styleName="group">
          <div styleName="cities">
            <FormGroup headerText={ABOUT.CITIES_LABEL}>
              <InputSelectionCitiesWithError
                {...{
                  ref: input => (this.citiesInput = input),
                  cities: this.props.cities,
                  placeholder: ABOUT.CITIES_PLACEHOLDER,
                  onSelect: this.onCitiesChange,
                  onFetchZones: this.onFetchZones,
                  cityName: city,
                  areaName: area,
                  validator: model.citiesValidator,
                }}
              />
            </FormGroup>
          </div>
        </div>
        <FormGroup headerText={ABOUT.CATEGORY_LABEL}>
          <InputSelectionCatesWithError
            {...{
              ref: input => (this.categoryInput = input),
              categories: categories.goods,
              categoryId,
              placeholder: ABOUT.CATEGORY_PLACEHOLDER,
              onChange: this.onCategoryChange,
              validator: model.categoryValidator,
            }}
          />
        </FormGroup>
        <FormGroup headerText={ABOUT.TAG_LABEL}>
          <InputTags
            {...{
              placeholder: ABOUT.TAG_PLACEHOLDER,
              onChange: this.onTagsChange,
              values: hashtags,
            }}
          />
          {this.state.tagsError &&
            <AlertPanel message={this.state.tagsError} />
          }
        </FormGroup>
        <NextStep
          {...{
            onNext: this.constructor.saveAndNext,
            onValid: this.validateAll,
            isDisabled: !model.isAboutValid(),
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
