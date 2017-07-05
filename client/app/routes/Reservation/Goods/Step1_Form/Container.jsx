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
import ExtraAddresses from './ExtraAddresses';
import DeliverySelection from './DeliverySelection';
import Model from './Model';

const Container = styled.div`
  margin-bottom: 50px;
`;
class Form extends React.PureComponent {
  static propTypes = {
    item: myPropTypes.item.isRequired,
    reservation: myPropTypes.reservation.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  render() {
    const { item, reservation, dispatch } = this.props;
    const itemInstance = new Model(item.detail, reservation, dispatch);
    const { coverUrl, pname, priceDesc, priceUnit } = itemInstance;
    const { sendOptions, returnOptions } = itemInstance;
    return (
      <Container >
        <TitleWrapper text="填寫預訂資訊" />
        <ItemCard {...{ coverUrl, pname, priceDesc, priceUnit }} />
        <FormBlock title="物流方式">
          <DeliverySelection label="到貨方式" instance={sendOptions} />
          {sendOptions.needAddresses && <ExtraAddresses />}
          <DeliverySelection label="寄還方式" instance={returnOptions} />
        </FormBlock>
        <FormBlock title="交易明細">
          1
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
  const { environment, item, reservation } = state;
  return ({ environment, item, reservation });
};
export default connect(mapStateToProps)(Form);
