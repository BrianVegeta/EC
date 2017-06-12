import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  TitleWrapper,
  FormGroup,
  InputCurrencyWithError,
  AlertPanel,
  DiscountGroup,
  NextStep,
} from '../../components';
import { updateProgress } from '../../../../actions/publishActions';
import { PATH, TITLE } from '../constants';
import Model from '../Model';
import ChargeType from './ChargeType';

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
  componentDidMount() {
    this.props.dispatch(updateProgress('STEP_4_PRICE'));
  }
  valid() {
    this.chargeTypeInput.valid();
    this.priceInput.valid();
    this.depositInput.valid();
    this.discountsInput.valid();
  }
  isValid() {
    const { publish, dispatch } = this.props;
    const {
      chargeType,
      payment,
      discounts,
    } = new Model(publish, dispatch);
    const isChargeTypeValid = chargeType.isChoosed;
    const isPriceValid = payment.isPriceValid();
    const isDepositValid = payment.isDepositValid();
    const isDiscountsValid = discounts.isValid();
    return isChargeTypeValid
      && isPriceValid
      && isDepositValid
      && isDiscountsValid;
  }
  render() {
    const { publish, dispatch } = this.props;
    const { chargeType, payment, discounts } = new Model(publish, dispatch);
    return (
      <div>
        <TitleWrapper>{TITLE.PRICE}</TitleWrapper>
        <FormGroup headerText="計費方式" large>
          <ChargeType
            {...{
              ref: ct => (this.chargeTypeInput = ct),
              chargeType,
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
        <FormGroup
          headerText="設定優惠價"
          helperText="優惠價能吸引更多人前來預訂"
          large
          optional
          topLine
        >
          <DiscountGroup
            {...{
              ref: dis => (this.discountsInput = dis),
              discounts: discounts.values,
              onChange: discounts.update,
              price: _.parseInt(payment.price),
            }}
          />
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
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish } = state;
  return ({ environment, routesHelper, publish });
};
export default connect(mapStateToProps)(CSS(PriceContainer, styles));
