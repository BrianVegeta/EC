import React from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import styles from './styles.sass';
import NextController from '../../components/NextController';
import { PRICE } from '../../constants/title';
import {
  FormGroup,
  BlockFormGroup,
  InputCounter,
  InputCurrency,
  TitleWrapper,
} from '../../components';

const CURRENCY_UNIT = 'NT$';
const CREATE_DISCOUNT_PATH = '/p/release_item/step4/d_c';
// TODO: routes for discount
const NEXT_PATH = '/p/release-goods/s5_r';
class PriceContainer extends React.Component {

  constructor(props) {
    super(props);
    this.saveAndNext = this.saveAndNext.bind(this);
  }

  saveAndNext() {
    browserHistory.push(NEXT_PATH);
  }

  render() {
    // TODO: now
    return (
      <div styleName="container">
        <TitleWrapper>{PRICE}</TitleWrapper>
        <FormGroup headerText="租金" helperBottomText="如需要運費，請記得加上！">
          <InputCurrency unit={CURRENCY_UNIT} value="" />
        </FormGroup>
        <FormGroup headerText="押金">
          <InputCurrency
            unit={CURRENCY_UNIT}
            value="1"
          />
        </FormGroup>
        <FormGroup headerText="至少租借天數" optional>
          <InputCounter value={null} suffix="天" placeholder="請輸入" width={152} />
        </FormGroup>
        <BlockFormGroup
          headerText="自訂折扣"
          helperText="使用折扣能吸引更多訂單"
          multiple
        >
          <Link to={CREATE_DISCOUNT_PATH}>
            <button styleName="newDiscountBtn" className="button">
              新增折扣
            </button>
          </Link>
        </BlockFormGroup>
        <NextController next={this.saveAndNext} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(PriceContainer, styles));
