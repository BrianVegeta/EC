import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CSS from 'react-css-modules';
import numeral from 'numeral';
import _ from 'lodash';
import {
  TitleWrapper,
  FormGroup,
  InputCounterWithError,
  InputCurrencyWithError,
  DiscountGroup,
  AlertPanel,
  NextStep,
} from '../../components';
import {
  updateChargeType,
  updateOverduePolicy,
  updateDiscounts,
} from '../../../../actions/publishActions';
import { PATH, TITLE } from '../constants';
import Model from '../Model';
import ChargeType from './ChargeType';
import Dates from './Dates';
import styles from './styles.sass';

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
    const { publish, dispatch } = this.props;
    const {
      chargeType,
      payment,
      datesRange,
      amount,
      serviceDiscount,
    } = new Model(publish, dispatch);
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
        <FormGroup headerText="">
          {!payment.isTotalPayValid &&
            <AlertPanel message={payment.totalPayValidator()[0]} />
          }
        </FormGroup>
        <div className="clear">
          <div styleName="datesRange">
            <FormGroup headerText="活動日期">
              <Dates
                startDate={datesRange.startDate}
                endDate={datesRange.endDate}
                onDatesChange={datesRange.updateDatesRange}
              />
            </FormGroup>
          </div>
          <div styleName="amountLimit">
            <FormGroup headerText="設定人數上限">
              <InputCounterWithError
                {...{
                  ref: input => (this.amountInput = input),
                  value: amount.value,
                  suffix: '人',
                  placeholder: '請輸入',
                  width: amount.inputWidth,
                  min: amount.inputMin,
                  max: amount.inputMax,
                  onChange: amount.updateAmount,
                  validator: amount.amountValidator,
                }}
              />
            </FormGroup>
          </div>
        </div>
        <FormGroup
          headerText={'設定優惠價'}
          helperText={'優惠價能吸引更多人前來預訂'}
          large
          optional
          topLine
        >
          <div styleName="discount">
            <InputCurrencyWithError
              {...{
                ref: input => (this.discount = input),
                value: serviceDiscount.value,
                onChange: serviceDiscount.update,
                validator: serviceDiscount.validator,
              }}
            />
          </div>
        </FormGroup>
        <NextStep
          {...{
            onNext: this.constructor.saveAndNext,
            onValid: this.validateAll,
            isDisabled: !this.isAllValid(),
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish } = state;
  return ({ environment, routesHelper, publish });
};
export default connect(mapStateToProps)(CSS(PriceContainer, styles));
