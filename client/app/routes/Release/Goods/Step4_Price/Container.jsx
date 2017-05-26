import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import numeral from 'numeral';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import NextController from '../../components/NextController';
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
  Tooltip,
} from '../../components';
import {
  updatePrice,
  updateDeposit,
  updateMinLeaseDays,
} from '../../../../actions/publishActions';

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
  }
  isValid() {

  }
  onPriceChange(value) {
    this.props.dispatch(updatePrice(value));
  }
  onDepositChange(value) {
    this.props.dispatch(updateDeposit(value));
  }
  render() {
    const { publish } = this.props;
    return (
      <div styleName="container">
        <TitleWrapper>{PRICE}</TitleWrapper>
        <FormGroup
          headerText={PRICE_LABEL}
          helperBottomText="如需要運費，請記得加上！"
        >
          <InputCurrency
            value={publish.price}
            onChange={this.onPriceChange}
          />
        </FormGroup>
        <FormGroup
          headerText={DEPOSIT_LABEL}
        >
          <InputCurrency
            value={publish.deposit}
            onChange={this.onDepositChange}
          />
        </FormGroup>
        <AlertPanel
          message={`${PRICE_LABEL} + ${DEPOSIT_LABEL}不得超過 ${numeral(TOTLE_PRICE_LIMIT).format('$0,000')}`}
          marginBottom={40}
        />
        <FormGroup headerText="至少租借天數" optional>
          <InputCounter
            value={null}
            suffix="天"
            placeholder="請輸入"
            width={INPUT_DAYS_COUNTER_WIDTH}
          />
        </FormGroup>
        <BlockFormGroup
          headerText="自訂折扣"
          helperText="使用折扣能吸引更多訂單"
          optional
        >
          <DiscountGroup />
        </BlockFormGroup>
        <NextController next={this.constructor.saveAndNext} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish } = state;
  return ({ environment, routesHelper, publish });
};
export default connect(mapStateToProps)(CSS(PriceContainer, styles));
