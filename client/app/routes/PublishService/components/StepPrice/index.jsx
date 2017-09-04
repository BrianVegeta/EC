import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import FormContainer from 'components/Publish/FormContainer';
import FormGroup from 'components/Form/Group';
import InputRadio from 'components/Input/Radio';
import InputTextCurrency from 'components/Input/TextCurrency';
import InputDatesPicker from 'components/Input/DatesPicker';
import InputTextCounter from 'components/Input/TextCounter';
import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_VALID,
} from 'components/Button/NextStep';
import constraints, { SERVICE_UNIT_MIN } from 'constraints/publish';
import {
  CHARGE_TYPE_FIX,
  CHARGE_TYPE_COUNT,
  CHARGE_TYPE_DAY,
} from 'constants/publishTypes';
// import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class StepPrice extends React.Component {

  static propTypes = {
    publish: myPropTypes.publish.isRequired,
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchValidate: PropTypes.func.isRequired,
    dispatchTouchPath: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.onNextStepClick = this.onNextStepClick.bind(this);
    this.state = {
      chargeTypeError: '',
      totalError: '',
    };
  }

  componentDidMount() {
    this.props.dispatchTouchPath();
  }

  onNextStepClick() {
    const {
      dispatchValidate,
      nextStep,
    } = this.props;
    dispatchValidate()
    .then(() => {
      nextStep();
    })
    .catch((errors) => {
      const { chargeTypeError, totalError } = errors;

      this.setState({ chargeTypeError: chargeTypeError || '' });
      if (chargeTypeError) return;

      this.setState({ totalError: totalError || '' });
      this.priceInput.valid();
      this.depositInput.valid();
      if (this.datesInput) this.datesInput.valid();
      if (this.unitInput) this.unitInput.valid();
      if (this.reservationDaysInput) this.reservationDaysInput.valid();
      this.discountInput.valid();
    });
  }

  renderRadioInput(state, text, CHARGE_TYPE) {
    const { dispatchChangeData } = this.props;
    return (
      <div styleName="charge-type">
        <InputRadio
          checked={state === CHARGE_TYPE}
          onChange={() => dispatchChangeData({ chargeType: CHARGE_TYPE })}
        >
          {text}
        </InputRadio>
      </div>
    );
  }

  renderDatesAndUnit({ startDate, endDate, unit }) {
    const { dispatchChangeData } = this.props;
    return (
      <div>
        <div styleName="dates">
          <FormGroup headerText="活動日期">
            <InputDatesPicker
              ref={datesInput => (this.datesInput = datesInput)}
              startDate={startDate}
              endDate={endDate}
              startDateConstraint={constraints.startDate}
              endDateConstraint={constraints.endDate}
              onDatesChange={dates => dispatchChangeData(dates)}
              validateOnBlur
            />
          </FormGroup>
        </div>
        <div styleName="unit">
          <FormGroup headerText="人數上限">
            <InputTextCounter
              ref={unitInput => (this.unitInput = unitInput)}
              value={unit ? String(unit) : ''}
              suffix="人"
              placeholder="請輸入"
              min={SERVICE_UNIT_MIN}
              max={false}
              onChange={value => dispatchChangeData({ unit: value })}
              constraints={constraints.serviceUnit}
              validateOnBlur
            />
          </FormGroup>
        </div>
      </div>
    );
  }

  renderReservationDays({ reservationDays }) {
    const { dispatchChangeData } = this.props;
    return (
      <FormGroup headerText="提前預約天數">
        <div styleName="reservation-days">
          <InputTextCounter
            ref={input => (this.reservationDaysInput = input)}
            value={reservationDays ? String(reservationDays) : ''}
            suffix="天"
            placeholder="請輸入天數(選填)"
            min={0}
            max={30}
            onChange={value => dispatchChangeData({ unit: value })}
            constraints={constraints.serviceReservationDays}
            validateOnBlur
          />
        </div>
      </FormGroup>
    );
  }

  renderDiscount({ discount, price }) {
    const { dispatchChangeData } = this.props;
    return (
      <div styleName="discounts-container">
        <FormGroup
          headerText={'設定優惠價'}
          helperText={'優惠價能吸引更多人前來預訂'}
          large
          optional
          topLine
        >
          <FormGroup headerText="下單可享優惠價格">
            <div styleName="discount">
              <InputTextCurrency
                ref={discountInput => (this.discountInput = discountInput)}
                value={discount}
                onChange={value => dispatchChangeData({ discount: value })}
                constraints={discount ? constraints.discount(price || 0) : null}
                validateOnBlur
              />
            </div>
          </FormGroup>
        </FormGroup>
      </div>
    );
  }

  renderAfterChoosed({ isChargeFix }) {
    const {
      publish,
      dispatchChangeData,
      isValid,
    } = this.props;
    const {
      price,
      deposit,
    } = publish;

    return (
      <div styleName="container">
        <FormGroup headerText="價格">
          <div styleName="currency-block">
            <InputTextCurrency
              ref={priceInput => (this.priceInput = priceInput)}
              value={price}
              onChange={value => dispatchChangeData({ price: value })}
              constraints={constraints.price}
              validateOnBlur
            />
          </div>
        </FormGroup>
        <FormGroup headerText="押金">
          <div styleName="currency-block">
            <InputTextCurrency
              ref={depositInput => (this.depositInput = depositInput)}
              value={deposit}
              onChange={value => dispatchChangeData({ deposit: value })}
              constraints={constraints.deposit}
              validateOnBlur
            />
          </div>
        </FormGroup>
        {
          isChargeFix ?
          this.renderDatesAndUnit(publish) :
          this.renderReservationDays(publish)
        }
        {isChargeFix && this.renderDiscount(publish)}
        <ButtonNextStep
          status={isValid ? STATUS_VALID : STATUS_DISABLE}
          onClick={this.onNextStepClick}
        />
      </div>
    );
  }

  render() {
    const { publish } = this.props;
    const { chargeType } = publish;
    return (
      <FormContainer title="設定價格" >
        {this.renderRadioInput(chargeType, '固定價格計費', CHARGE_TYPE_FIX)}
        {this.renderRadioInput(chargeType, '數量計費', CHARGE_TYPE_COUNT)}
        {this.renderRadioInput(chargeType, '天數計費', CHARGE_TYPE_DAY)}
        {{
          [CHARGE_TYPE_FIX]: this.renderAfterChoosed({ isChargeFix: true }),
          [CHARGE_TYPE_COUNT]: this.renderAfterChoosed({ isChargeFix: false }),
          [CHARGE_TYPE_DAY]: this.renderAfterChoosed({ isChargeFix: false }),
        }[chargeType]}
      </FormContainer>
    );
  }
}

export default CSS(StepPrice, styles);
