import React, { PropTypes } from 'react';
import IconRemove from 'react-icons/lib/md/close';
import validate from 'validate.js';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import constraints from '../constraints';
import InputCounterWithError from '../../InputCounterWithError';
import InputCurrencyWithError from '../../InputCurrencyWithError';
import { DIMESIONS, ICONS } from '../../../../../constants';

class DiscountRule extends React.Component {
  static defaultProps = {
    days: null,
    offer: null,
    hasHeader: false,
  };
  static propTypes = {
    days: PropTypes.number,
    offer: PropTypes.number,
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
    const { hasHeader } = this.props;
    const daysProps = {
      ref: di => (this.daysInput = di),
      value: this.props.days,
      suffix: '天',
      min: 1,
      max: 30,
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
          { hasHeader && <div styleName="daysHead">租借天數（最多30天）</div>}
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
