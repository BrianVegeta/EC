import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import FormContainer from 'components/Publish/FormContainer';
import FormGroup from 'components/Form/Group';
import InputRadio from 'components/Input/Radio';
import InputTextCurrency from 'components/Input/TextCurrency';
import InputTextCounter from 'components/Input/TextCounter';
import DiscountGroup from 'components/DiscountGroup';

import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_VALID,
} from 'components/Button/NextStep';
import constraints, { SERVICE_UNIT_MIN } from 'constraints/publish';

// import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import OverduePolicy from '../OverduePolicy';

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
      this.discountInput.valid();
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

  renderDatesAndUnit({ unit }) {
    const { dispatchChangeData } = this.props;
    return (
      <div>
        <div styleName="unit">
          <FormGroup headerText="庫存數量">
            <InputTextCounter
              ref={unitInput => (this.unitInput = unitInput)}
              value={unit ? String(unit) : ''}
              suffix="個"
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

  renderOverduePolicy({ hasOverduePolicy, overdueRate, deposit }) {
    return (
      <FormGroup headerText="建立逾期金政策">
        <OverduePolicy
          enable={hasOverduePolicy}
          rate={overdueRate}
          deposit={deposit}
          onChange={this.props.dispatchChangeData}
        />
      </FormGroup>
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

  renderDiscount({ discounts, price }) {
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
            defaultDiscountObj={{
              type: 'GREATER_OR_EQUAL_TO_N_COUNT',
              param: null,
              discount: null,
            }}
          />
        </FormGroup>
      </div>
    );
  }

  renderAfterChoosed() {
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
        { this.renderDatesAndUnit(publish) }
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

        { this.renderOverduePolicy(publish) }
        { this.renderDiscount(publish)}
        <ButtonNextStep
          status={isValid ? STATUS_VALID : STATUS_DISABLE}
          onClick={this.onNextStepClick}
        />
      </div>
    );
  }

  render() {
    return (
      <FormContainer title="設定庫存及價格" >
        {this.renderAfterChoosed()}
      </FormContainer>
    );
  }
}

export default CSS(StepPrice, styles);
