import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';
import styled from 'styled-components';

import TitleWrapper from 'components/reservation/wrapper/Title';
import ItemCard from 'components/reservation/wrapper/ItemCard';
import FormBlock from 'components/reservation/wrapper/FormBlock';
import FormControl from 'components/reservation/wrapper/FormControl';
import FormButton from 'components/FormButton';

import { fetchCoupons } from 'actions/myCouponsActions';

import DeliverySelection from './wrappers/DeliverySelection';
import ExtraAddresses from './wrappers/ExtraAddresses';
import RentDatesRange from './wrappers/RentDatesRange';
import Amount from './wrappers/Amount';
import Coupons from './wrappers/Coupons';
import CalculationPanel from './wrappers/CalculationPanel';

import Model from './Model';

const Container = styled.div`
  margin-bottom: 50px;
`;

class Form extends React.PureComponent {

  static propTypes = {
    item: myPropTypes.item.isRequired,
    reservation: myPropTypes.reservation.isRequired,
    myCoupons: myPropTypes.myCoupons.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatch(fetchCoupons());
  }

  render() {
    const { item, reservation, myCoupons, dispatch } = this.props;
    const itemInstance = new Model(item.detail, reservation, myCoupons, dispatch);
    const { coverUrl, pname, priceDesc, priceUnit } = itemInstance;
    // 物流方式
    const {
      sendOptions,
      sendAddresses,
      returnOptions,
    } = itemInstance;
    // 交易明細
    const {
      datesRange,
      amountModel,
      couponsModel,
      calculationModel,
    } = itemInstance;
    return (
      <Container >
        <TitleWrapper text="填寫預訂資訊" />
        <ItemCard {...{ coverUrl, pname, priceDesc, priceUnit }} />
        <FormBlock title="物流方式">
          <DeliverySelection
            label="到貨方式"
            model={sendOptions}
          />
          {sendOptions.needAddresses &&
            <ExtraAddresses model={sendAddresses} />}
          <DeliverySelection
            label="寄還方式"
            helper="當您提交預訂單後，分享人會提供給您寄還的地點"
            model={returnOptions}
          />
        </FormBlock>
        <FormBlock title="交易明細">
          <div>
            <RentDatesRange label="使用時間" model={datesRange} />
            <Amount model={amountModel} />
          </div>
          <Coupons placeholder="選擇折價券" model={couponsModel} />
          <CalculationPanel model={calculationModel} />
        </FormBlock>
        <FormBlock
          title="聯絡資訊"
          tip="您與另一位用戶確認預訂後，才會顯示您的姓名與號碼，用以聯絡彼此。"
        >
          1
        </FormBlock>
        <FormBlock title="備註" hasMargin={false} hasBottomLine={false}>
          1
        </FormBlock>
        <FormButton colorType="orange" content="下一步" width={150} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, item, reservation, myCoupons } = state;
  return ({ environment, item, reservation, myCoupons });
};
export default connect(mapStateToProps)(Form);
