import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import FormContainer from 'components/Publish/FormContainer';
import FormGroup from 'components/Form/Group';
import InputRadio from 'components/Input/Radio';
import InputTextCurrency from 'components/Input/TextCurrency';
import InputDatesPicker from 'components/Input/DatesPicker';
import InputTextCounter from 'components/Input/TextCounter';
import DiscountGroup from 'components/DiscountGroup';
import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_VALID,
} from 'components/Button/NextStep';
import AlertTotalError from 'components/Publish/AlertTotalError';
import {
  CHARGE_TYPE_DAY,
  CHARGE_TYPE_MONTH,
  GREATER_OR_EQUAL_TO_N_DAY,
  GREATER_OR_EQUAL_TO_N_MONTH,
 } from 'constants/publishTypes';
import constraints, { SERVICE_UNIT_MIN } from 'constraints/publish';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class StepPrice extends React.Component {

  static propTypes = {
    publish: myPropTypes.publish.isRequired,
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchChangePaidData: PropTypes.func.isRequired,
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
    dispatchValidate().then(() => {
      nextStep();
    }).catch((errors) => {
      if (errors.chargeTypeError) return false;
      return errors;
    }).then((errors) => {
      if (!errors) return;
      this.setState({ totalError: errors.totalError || '' });
      this.priceInput.valid();
      this.depositInput.valid();
      if (this.datesInput) this.datesInput.valid();
      if (this.unitInput) this.unitInput.valid();
      if (this.reservationDaysInput) this.reservationDaysInput.valid();
      if (this.discountInput) this.discountInput.valid();
    });
  }

  renderRadioInput(state, text, CHARGE_TYPE) {
    const { dispatchChangePaidData } = this.props;
    return (
      <div styleName="charge-type">
        <InputRadio
          checked={state === CHARGE_TYPE}
          onChange={() => dispatchChangePaidData({ chargeType: CHARGE_TYPE })}
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

  renderDiscount({ chargeType, discounts, price }) {
    const tPrice = (price) ? parseInt(price, 10) : 0;
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
          <DiscountGroup
            ref={discountInput => (this.DiscountGroup = discountInput)}
            onChange={dispatchChangeData}
            discounts={discounts}
            price={tPrice}
            unitStr={(chargeType === CHARGE_TYPE_MONTH) ? '月' : '天'}
            unitMax={(chargeType === CHARGE_TYPE_MONTH) ? 12 : 30}
            defaultDiscountObj={{
              type: (chargeType === CHARGE_TYPE_MONTH) ? GREATER_OR_EQUAL_TO_N_MONTH
                : GREATER_OR_EQUAL_TO_N_DAY,
              param: null,
              discount: null,
            }}
          />
        </FormGroup>
      </div>
    );
  }

  renderAfterChoosed(type) {
    const { publish } = this.props;
    if (!publish.chargeType) return null;
    const {
      dispatchChangeData,
      isValid,
    } = this.props;
    const {
      price,
      deposit,
    } = publish;

    return (
      <div styleName="container">
        <FormGroup headerText={type === CHARGE_TYPE_DAY ? '價格（每日價格）' : '價格（每月價格）'}>
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
        <FormGroup headerText="押金（每筆交易）">
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
        <AlertTotalError totalError={this.state.totalError} />
        {this.renderReservationDays(publish)}
        {this.renderDiscount(publish)}
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
        {this.renderRadioInput(chargeType, '以日計費', CHARGE_TYPE_DAY)}
        {this.renderRadioInput(chargeType, '以月計費', CHARGE_TYPE_MONTH)}
        {{
          [CHARGE_TYPE_DAY]: this.renderAfterChoosed(CHARGE_TYPE_DAY),
          [CHARGE_TYPE_MONTH]: this.renderAfterChoosed(CHARGE_TYPE_MONTH),
        }[chargeType]}
      </FormContainer>
    );
  }
}

export default CSS(StepPrice, styles);
