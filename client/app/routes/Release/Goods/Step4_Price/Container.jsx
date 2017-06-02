import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import validate from 'validate.js';
import numeral from 'numeral';
import _ from 'lodash';
import { PRICE } from '../../constants/title';
import { INPUT_DAYS_COUNTER_WIDTH } from '../../../../constants/dimesions';
import {
  TitleWrapper,
  FormGroup,
  BlockFormGroup,
  InputCounter,
  InputCurrency,
  DiscountGroup,
  AlertPanel,
  WithError,
  NextStep,
} from '../../components';
import OverduePolicy from '../../components/OverduePolicy';
import {
  updatePrice,
  updateDeposit,
  updateMinLeaseDays,
} from '../../../../actions/publishActions';
import constraints from './constraints';

const NEXT_PATH = '/p/release-goods/s5_r';
const PRICE_LABEL = '租金';
const DEPOSIT_LABEL = '押金';
const TOTLE_PRICE_LIMIT = 99999;
class PriceContainer extends React.Component {
  static saveAndNext() {
    browserHistory.push(NEXT_PATH);
  }
  static propTypes = {
    publish: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.onDepositChange = this.onDepositChange.bind(this);
    this.onMinLeaseDayChange = this.onMinLeaseDayChange.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.onPriceBlur = this.onPriceBlur.bind(this);
    this.onDepositBlur = this.onDepositBlur.bind(this);
    this.onMinLeaseDaysBlur = this.onMinLeaseDaysBlur.bind(this);
    this.onActiveOverdue = this.onActiveOverdue.bind(this);
    this.state = {
      priceError: null,
      depositError: null,
      totolError: null,
      minLeaseDaysError: null,
      isOverdueActivating: false,
    };
  }
  onPriceChange(value) {
    this.props.dispatch(updatePrice(value));
  }
  onDepositChange(value) {
    this.props.dispatch(updateDeposit(value));
  }
  onMinLeaseDayChange(value) {
    this.props.dispatch(updateMinLeaseDays(value));
  }
  onPriceBlur() {
    this.validate('price');
  }
  onDepositBlur() {
    this.validate('deposit');
  }
  onActiveOverdue(checked) {
    this.setState({ isOverdueActivating: checked });
  }
  onMinLeaseDaysBlur() {
    this.validate('minLeaseDays');
  }
  validateAll() {
    const { price, deposit, minLeaseDays } = this.props.publish;
    const errors = validate({ price, deposit, minLeaseDays }, constraints);
    const state = {
      priceError: null,
      depositError: null,
      totalError: null,
      minLeaseDaysError: null,
    };
    if (errors && !errors.price && !errors.deposit) {
      if (_.parseInt(price) + _.parseInt(deposit) > TOTLE_PRICE_LIMIT) {
        state.totalError = `${PRICE_LABEL} + ${DEPOSIT_LABEL}不得超過 ${numeral(TOTLE_PRICE_LIMIT).format('$0,000')}`;
      }
    }
    if (errors) {
      state.priceError = errors.price ? errors.price[0] : null;
      state.depositError = errors.deposit ? errors.deposit[0] : null;
      state.minLeaseDaysError = errors.minLeaseDays ? errors.minLeaseDays[0] : null;
    }
    this.setState(state);
  }
  validate(name) {
    const { publish } = this.props;
    const errors = validate.single(publish[name], constraints[name]);
    const state = {};
    state[`${name}Error`] = errors ? errors[0] : null;
    this.setState(state);
  }
  hasErrors() {
    const { price, deposit, minLeaseDays } = this.props.publish;
    const total = _.parseInt(price) + _.parseInt(deposit);
    const errors = validate({ price, deposit, total, minLeaseDays }, constraints);
    return errors;
  }
  render() {
    const { publish } = this.props;
    const { totalError } = this.state;
    const priceInputProps = {
      value: publish.price,
      onChange: this.onPriceChange,
      onBlur: this.onPriceBlur,
    };
    const depositInputProps = {
      value: publish.deposit,
      onChange: this.onDepositChange,
      onBlur: this.onDepositBlur,
      allowNull: false,
    };
    const overdueProps = {
      deposit: _.isEmpty(publish.deposit) ? 0 : _.parseInt(publish.deposit),
    };
    const minLeaseDaysInputProps = {
      value: publish.minLeaseDays,
      suffix: '天',
      placeholder: '請輸入',
      width: INPUT_DAYS_COUNTER_WIDTH,
      onChange: this.onMinLeaseDayChange,
      onBlur: this.onMinLeaseDaysBlur,
    };
    return (
      <div>
        <TitleWrapper>{PRICE}</TitleWrapper>
        <FormGroup
          headerText={PRICE_LABEL}
          helperBottomText="如需要運費，請記得加上！"
        >
          <WithError error={this.state.priceError}>
            <InputCurrency {...priceInputProps} />
          </WithError>
        </FormGroup>
        <FormGroup
          headerText={DEPOSIT_LABEL}
          helperBottomText="押金至少需要 NT$ 100 喔！"
        >
          <WithError error={this.state.depositError}>
            <InputCurrency {...depositInputProps} />
          </WithError>
        </FormGroup>
        {totalError && <AlertPanel message={totalError} marginBottom={40} />}
        <OverduePolicy {...overdueProps} />
        <FormGroup headerText="至少租借天數" optional>
          <WithError error={this.state.minLeaseDaysError}>
            <InputCounter {...minLeaseDaysInputProps} />
          </WithError>
        </FormGroup>
        <BlockFormGroup
          headerText="自訂折扣"
          helperText="使用折扣能吸引更多訂單"
          optional
        >
          <DiscountGroup />
        </BlockFormGroup>
        <NextStep
          onNext={this.constructor.saveAndNext}
          onValid={this.validateAll}
          isDisabled={!!this.hasErrors()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish } = state;
  return ({ environment, routesHelper, publish });
};
export default connect(mapStateToProps)(PriceContainer);
