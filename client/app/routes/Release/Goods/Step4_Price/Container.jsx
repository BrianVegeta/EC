import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import validate from 'validate.js';
import numeral from 'numeral';
import _ from 'lodash';
import {
  TitleWrapper,
  FormGroup,
  BlockFormGroup,
  InputCounterWithError,
  InputCurrencyWithError,
  DiscountGroup,
  AlertPanel,
  NextStep,
} from '../../components';
import OverduePolicy from '../../components/OverduePolicy';
import {
  updatePrice,
  updateDeposit,
  updateMinLeaseDays,
  updateOverduePolicy,
  updateDiscounts,
} from '../../../../actions/publishActions';
import constraints, { numberNotInRage } from './constraints';
import { PATH, TITLE } from '../../constants';
import * as DIMESIONS from '../../../../constants/dimesions';


const PRICE_LABEL = '租金';
const PRICE_HELPER = '如需要運費，請記得加上！';
const DEPOSIT_LABEL = '押金';
const DEPOSIT_HELPER = `${DEPOSIT_LABEL}至少需要 NT$ 100 喔！`;
const TOTLE_PRICE_LIMIT = 99999;
const TOTAL_ERROR_MSG = `${PRICE_LABEL} + ${DEPOSIT_LABEL}不得超過 ${numeral(TOTLE_PRICE_LIMIT).format('$0,000')}`;
const MIN_LEASE_DAYS_LABEL = '至少租借天數';
const DISCOUNTS_LABEL = '設定優惠價';
const DISCOUNTS_HELPER = '優惠價能吸引更多人前來預訂喔';

class PriceContainer extends React.Component {
  static saveAndNext() {
    browserHistory.push(PATH.STEP_5_REGULATION);
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
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onDepositChange = this.onDepositChange.bind(this);
    this.onMinLeaseDayChange = this.onMinLeaseDayChange.bind(this);
    this.onDiscountsChange = this.onDiscountsChange.bind(this);

    this.validateAll = this.validateAll.bind(this);
    this.onActiveOverdue = this.onActiveOverdue.bind(this);

    this.priceValidator = this.priceValidator.bind(this);
    this.depositValidator = this.depositValidator.bind(this);
    this.onOverdueChange = this.onOverdueChange.bind(this);
    this.minLeaseDaysValidator = this.minLeaseDaysValidator.bind(this);
    this.state = {
      isOverdueActivating: false,
      discounts: null,
    };
  }
  onPriceChange(value) {
    this.props.dispatch(updatePrice(value));
  }
  onDepositChange(value) {
    this.props.dispatch(updateDeposit(value));
  }
  onOverdueChange(value) {
    this.props.dispatch(updateOverduePolicy(value));
  }
  onMinLeaseDayChange(value) {
    this.props.dispatch(updateMinLeaseDays(value));
  }
  onActiveOverdue(checked) {
    this.setState({ isOverdueActivating: checked });
  }
  onDiscountsChange(discounts) {
    this.props.dispatch(
      updateDiscounts(discounts),
    );
  }
  validateAll() {
    const isPriceValid = this.priceInput.valid();
    const isDepositValid = this.depositInput.valid();
    this.minLeaseDaysInput.valid();
    if (isPriceValid && isDepositValid) {
      this.totalValid();
    }
    this.discounts.valid();
  }
  isAllValid() {
    const isPriceValid = _.isEmpty(this.priceValidator());
    const isDepositValid = _.isEmpty(this.depositValidator());
    const isMinLeaseDaysValid = _.isEmpty(this.minLeaseDaysValidator());
    const totalErrors = (isPriceValid && isDepositValid) ? this.totalValidator() : null;
    const isDiscountsValid = this.isDiscountsValid();
    return isPriceValid &&
      isDepositValid &&
      isMinLeaseDaysValid &&
      _.isEmpty(totalErrors) &&
      isDiscountsValid;
  }
  validator(name) {
    const { publish } = this.props;
    return validate.single(publish[name], constraints[name]);
  }
  priceValidator() {
    return this.validator('price');
  }
  depositValidator() {
    validate.validators.numberNotInRage = numberNotInRage;
    return this.validator('deposit');
  }
  totalValidator() {
    const { price, deposit } = this.props.publish;
    const numbericPrice = _.parseInt(price);
    const numbericDeposit = _.parseInt(deposit);
    return (numbericPrice + numbericDeposit) > TOTLE_PRICE_LIMIT ? [TOTAL_ERROR_MSG] : [];
  }
  totalValid() {
    const errors = this.totalValidator();
    this.setState({ totalError: (_.isEmpty(errors) ? null : errors[0]) });
  }
  isDiscountsValid() {
    const { discounts } = this.props.publish;
    const isDuplcateValid = !DiscountGroup.isDuplicate(discounts);
    const isAllPresence = _.filter(discounts, discount =>
      !discount.days || !discount.offer,
    ).length <= 0;
    return isDuplcateValid && isAllPresence;
  }
  minLeaseDaysValidator() {
    return this.validator('minLeaseDays');
  }
  render() {
    const { publish } = this.props;
    const { totalError } = this.state;
    const priceProps = {
      ref: input => (this.priceInput = input),
      value: publish.price,
      onChange: this.onPriceChange,
      validator: this.priceValidator,
    };
    const depositProps = {
      ref: input => (this.depositInput = input),
      value: publish.deposit,
      onChange: this.onDepositChange,
      validator: this.depositValidator,
    };
    const overdueProps = {
      deposit: _.isEmpty(publish.deposit) ? 0 : _.parseInt(publish.deposit),
      onChange: this.onOverdueChange,
    };
    const minLeaseDaysProps = {
      ref: input => (this.minLeaseDaysInput = input),
      value: publish.minLeaseDays,
      suffix: '天',
      placeholder: '請輸入',
      width: DIMESIONS.INPUT_DAYS_COUNTER_WIDTH,
      onChange: this.onMinLeaseDayChange,
      validator: this.minLeaseDaysValidator,
    };
    const nextStepProps = {
      onNext: this.constructor.saveAndNext,
      onValid: this.validateAll,
      isDisabled: !this.isAllValid(),
    };
    const discountsProps = {
      discounts: publish.discounts,
      onChange: this.onDiscountsChange,
      price: _.parseInt(publish.price),
      ref: dis => (this.discounts = dis),
    };
    return (
      <div>
        <TitleWrapper>{TITLE.PRICE}</TitleWrapper>
        <FormGroup headerText={PRICE_LABEL} helperBottomText={PRICE_HELPER}>
          <InputCurrencyWithError {...priceProps} />
        </FormGroup>
        <FormGroup headerText={DEPOSIT_LABEL} helperBottomText={DEPOSIT_HELPER}>
          <InputCurrencyWithError {...depositProps} />
        </FormGroup>
        {totalError && <AlertPanel message={totalError} marginBottom={40} />}
        <OverduePolicy {...overdueProps} />
        <FormGroup headerText={MIN_LEASE_DAYS_LABEL} optional>
          <InputCounterWithError {...minLeaseDaysProps} />
        </FormGroup>
        <BlockFormGroup headerText={DISCOUNTS_LABEL} helperText={DISCOUNTS_HELPER} optional>
          <DiscountGroup {...discountsProps} />
        </BlockFormGroup>
        <NextStep {...nextStepProps} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish } = state;
  return ({ environment, routesHelper, publish });
};
export default connect(mapStateToProps)(PriceContainer);
