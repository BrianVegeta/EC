import React from 'react';
import PropTypes from 'prop-types';
import IconRemove from 'react-icons/lib/md/close';
import validate from 'validate.js';
import CSS from 'react-css-modules';
import { DIMESIONS, ICONS } from 'constants';

import InputCounterWithError from 'components/Input/TextCounter';
import InputCurrencyWithError from 'components/Input/TextCurrency';
import styles from './styles.sass';
import constraints from '../constraints';


class DiscountRule extends React.Component {
  static defaultProps = {
    days: null,
    offer: null,
    hasHeader: false,
    unit: null,
    unitStr: '天',
    unitMax: 30,
  };
  static propTypes = {
    days: PropTypes.number,
    offer: PropTypes.number,
    unitStr: PropTypes.string,
    unitMax: PropTypes.number,
    hasHeader: PropTypes.bool,
    price: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onDaysChange = this.onDaysChange.bind(this);
    this.onOfferChange = this.onOfferChange.bind(this);
    this.daysValidator = this.daysValidator.bind(this);
    this.offerValidator = this.offerValidator.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  onDaysChange(value) {
    this.props.onChange(value, this.props.offer);
  }
  onRemove() {
    this.props.onRemove();
  }
  onOfferChange(value) {
    const { onChange, days } = this.props;
    onChange(days, value);
  }
  valid() {
    this.daysInput.valid();
  }
  validator(name) {
    return validate.single(this.props[name], constraints(this.props.price)[name]);
  }
  daysValidator() {
    return this.validator('days');
  }
  offerValidator() {
    return this.validator('offer');
  }
  render() {
    const { hasHeader, unitStr, unitMax } = this.props;
    const daysProps = {
      ref: di => (this.daysInput = di),
      value: this.props.days,
      suffix: this.props.unitStr,
      min: 1,
      max: this.props.unitMax,
      width: DIMESIONS.INPUT_DAYS_COUNTER_WIDTH,
      onChange: this.onDaysChange,
      validator: this.daysValidator,
    };
    const offerProps = {
      value: this.props.offer,
      suffix: '元',
      width: DIMESIONS.INPUT_DISCOUNT_OFFER_WIDTH,
      onChange: this.onOfferChange,
      validator: this.offerValidator,
    };
    return (
      <div styleName="ruleContainer">
        <div styleName="headers">
          { hasHeader && <div styleName="daysHead">租借天數（最多{unitMax}{unitStr}）</div>}
          { hasHeader && <div styleName="offerHead">每件優惠價</div>}
        </div>
        <div styleName="inputs" className="clear">
          <div styleName="days">
            <InputCounterWithError {...daysProps} />
          </div>
          <div styleName="offer">
            <InputCurrencyWithError {...offerProps} />
          </div>
        </div>
        <div styleName="remove">
          <button className="button" onClick={this.onRemove}>
            <IconRemove
              size={ICONS.ICON_SIZE_DISCOUNT_CONTROL}
              color={ICONS.ICON_COLOR_DISCOUNT_REMOVE}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default CSS(DiscountRule, styles);
