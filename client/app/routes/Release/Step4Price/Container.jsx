import React from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import styles from './styles.sass';
import NextController from '../NextController';
import { PRICE } from '../constants/title';
import Title from '../components/Title';
import FormGroup from '../components/FormGroup';
import InputCurrency from '../components/InputCurrency';
import InputCounter from '../components/InputCounter';

const CURRENCY_UNIT = 'NT$';
const CREATE_DISCOUNT_PATH = '/p/release_item/step4/d_c';
// TODO: routes for discount
class PriceContainer extends React.Component {

  constructor(props) {
    super(props);
    this.saveAndNext = this.saveAndNext.bind(this);
  }

  saveAndNext() {
    setTimeout(() =>
      // TODO: path
      browserHistory.push('/p/release_item/step5')
    , 2000);
  }

  render() {
    // TODO: now
    return (
      <div styleName="container">
        <Title text={PRICE} helperText="合理的價格有助於成交機率" />
        <FormGroup headerText="租金" helperText="一天的價格為單位">
          <InputCurrency
            unit={CURRENCY_UNIT}
            value="12"
          />
        </FormGroup>
        <FormGroup headerText="押金" helperText="請依物品狀況，設定合理的價格">
          <InputCurrency
            unit={CURRENCY_UNIT}
            value="1"
          />
        </FormGroup>
        <FormGroup
          headerText="至少租借天數"
          helperText="一天的價格為單位"
          optional
        >
          <InputCounter value={1} suffix="天" />
        </FormGroup>
        <FormGroup
          headerText="自訂折扣"
          helperText="使用折扣能吸引更多用戶前來下單"
          optional
        >
          <Link to={CREATE_DISCOUNT_PATH}>
            <button styleName="newDiscountBtn" className="button">
              新增折扣
            </button>
          </Link>
        </FormGroup>
        <NextController next={this.saveAndNext} />
        <div>{this.props.modalComponent}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(PriceContainer, styles));
