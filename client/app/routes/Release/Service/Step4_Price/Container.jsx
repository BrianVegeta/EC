import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  TitleWrapper,
  FormGroup,
  InputCounterWithError,
  InputCurrencyWithError,
  AlertPanel,
  NextStep,
} from '../../components';
import { PATH, TITLE } from '../constants';
import Model from '../Model';
import ChargeType from './ChargeType';
import DatesWithError from './DatesWithError';

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
    this.valid = this.valid.bind(this);
  }
  valid() {
    this.priceInput.valid();
    this.depositInput.valid();
    const { publish, dispatch } = this.props;
    const { chargeType } = new Model(publish, dispatch);
    if (chargeType.is('fix')) {
      this.datesRangeInput.valid();
      this.amountInput.valid();
    }
    this.discountInput.valid();
  }
  isValid() {
    const { publish, dispatch } = this.props;
    const {
      chargeType,
      payment,
      datesRange,
      amount,
      serviceDiscount,
    } = new Model(publish, dispatch);
    const isChargeTypeValid = chargeType.isChoosed;
    const isPriceValid = payment.isPriceValid();
    const isDepositValid = payment.isDepositValid();
    const isDatesValid = chargeType.is('fix') ? datesRange.isValid() : true;
    const isAmountValid = chargeType.is('fix') ? amount.isValid() : true;
    const isServiceDiscount = serviceDiscount.isValid();
    return isChargeTypeValid &&
      isPriceValid &&
      isDepositValid &&
      isDatesValid &&
      isAmountValid &&
      isServiceDiscount;
  }
  renderFixExtraInput(model) {
    const { datesRange, amount } = model;
    return (
      <div className="clear">
        <div styleName="datesRange">
          <FormGroup headerText="活動日期">
            <DatesWithError
              ref={dates => (this.datesRangeInput = dates)}
              startDate={datesRange.startDate}
              endDate={datesRange.endDate}
              onDatesChange={datesRange.updateDatesRange}
              validator={datesRange.validator}
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
    );
  }
  renderAfterChoosed(model) {
    const {
      chargeType,
      payment,
      serviceDiscount,
    } = model;
    return (
      <div>
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
        { chargeType.is('fix') && this.renderFixExtraInput(model) }
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
                ref: input => (this.discountInput = input),
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
            onValid: this.valid,
            isDisabled: !this.isValid(),
          }}
        />
      </div>
    );
  }

  render() {
    const { publish, dispatch } = this.props;
    const model = new Model(publish, dispatch);
    const { chargeType } = model;
    return (
      <div>
        <TitleWrapper>{TITLE.PRICE}</TitleWrapper>
        <FormGroup headerText="計費方式" large>
          <ChargeType {...{ chargeType }} />
        </FormGroup>
        { chargeType.isChoosed && this.renderAfterChoosed(model) }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish } = state;
  return ({ environment, routesHelper, publish });
};
export default connect(mapStateToProps)(CSS(PriceContainer, styles));
