import React, { PropTypes } from 'react';
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
import InputRadio from '../../components/InputRadio';
import TooltipHelp from '../../components/TooltipHelp';
import Tooltip from '../../components/Tooltip';
import OverduePolicy from '../../components/OverduePolicy';
import {
  updateChargeType,
  updateDeposit,
  updateOverduePolicy,
  updateDiscounts,
} from '../../../../actions/publishActions';
import { PATH, TITLE } from '../constants';
import * as DIMESIONS from '../../../../constants/dimesions';
import Model from '../Model';
import ChargeType from './ChargeType';
import Dates from './Dates';


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
    this.onDiscountsChange = this.onDiscountsChange.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.onActiveOverdue = this.onActiveOverdue.bind(this);
    this.onOverdueChange = this.onOverdueChange.bind(this);
    this.state = {
      isOverdueActivating: false,
      discounts: null,
    };

    this.changeChargeType = this.changeChargeType.bind(this);
  }
  onOverdueChange(value) {
    this.props.dispatch(updateOverduePolicy(value));
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
    if (isPriceValid && isDepositValid) {
      this.totalValid();
    }
    this.discounts.valid();
  }
  isAllValid() {
    const isPriceValid = false;
    const isDepositValid = false;
    const totalErrors = (isPriceValid && isDepositValid) ? this.totalValidator() : null;
    const isDiscountsValid = this.isDiscountsValid();
    return isPriceValid &&
      isDepositValid &&
      _.isEmpty(totalErrors) &&
      isDiscountsValid;
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
  changeChargeType(type) {
    this.props.dispatch(updateChargeType(type));
  }
  render() {
    const { publish } = this.props;
    const { totalError } = this.state;
    const overdueProps = {
      deposit: _.isEmpty(publish.deposit) ? 0 : _.parseInt(publish.deposit),
      onChange: this.onOverdueChange,
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
    const { dispatch } = this.props;
    const { chargeType, payment } = new Model(publish, dispatch);
    return (
      <div>
        <TitleWrapper>{TITLE.PRICE}</TitleWrapper>
        <FormGroup headerText="計費方式" large>
          <ChargeType
            {...{
              chargeType,
              onChange: this.changeChargeType,
            }}
          />
        </FormGroup>
        <FormGroup headerText="價格">
          <InputCurrencyWithError
            {...{
              ref: input => (this.priceInput = input),
              value: payment.price,
              onChange: payment.updatePrice,
              validator: payment.priceValidator,
            }}
          />
        </FormGroup>
        <FormGroup headerText="押金">
          <InputCurrencyWithError
            {...{
              ref: input => (this.depositInput = input),
              value: payment.deposit,
              onChange: payment.updateDeposit,
              validator: payment.depositValidator,
            }}
          />
        </FormGroup>
        <FormGroup headerText="活動日期">
          <Dates />
        </FormGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish } = state;
  return ({ environment, routesHelper, publish });
};
export default connect(mapStateToProps)(PriceContainer);
