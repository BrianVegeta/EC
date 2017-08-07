import React from 'react';
import { Link } from 'react-router';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import FormButton from 'components/FormButton';
import Discounter from './Discounter';
import Term from './Term';

const Container = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
  padding: 20px;
  border: 1px solid #CECECE;
`;
const AmountWarning = styled.div`
  color: #F26363;
  font-size: 15px;
  line-height: 15px;
  margin: 17px 0 17px 20px;
`;
const SubmitButton = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 10px;
`;
const Notice = styled.div`
  text-align: center;
  font-size: 14px;
  color: #777;
`;
class OrderBoard extends React.Component {
  static propTypes = {
    model: myPropTypes.orderBoard.isRequired,
  };
  render() {
    const { model } = this.props;
    return (
      <Container>
        {model.discounts && model.discounts.map((discount, index) =>
          <Discounter
            key={`${index + 1}`}
            text={discount.text}
            price={discount.price}
          />,
        )}
        {model.minCostDesc && <Term icon="date" content={model.minCostDesc} />}
        {model.dateRange && <Term icon="date" content={model.dateRange} />}
        {model.serviceAssignWay && <Term icon="person" content={model.serviceAssignWay} />}
        {model.amountRemaining &&
          <AmountWarning>{model.amountRemaining}</AmountWarning>}
        {model.deposit && <Term icon="time" content={model.deposit} />}
        {model.payment && <Term icon="bank" content={model.payment} />}
        <SubmitButton>
          <Link to={model.orderLink}>
            <FormButton
              content={model.isMine ? '編輯商品' : '馬上預訂'}
              colorType={model.isMine ? 'greenBorder' : 'orange'}
              onClick={() => console.warn('馬上預訂 need fixed')}
              size="md"
            />
          </Link>
        </SubmitButton>
        <Notice>
          <div>預訂後!</div>
          <div>須等待分享人同意，才會進行付款喔。</div>
        </Notice>
      </Container>
    );
  }
}

export default OrderBoard;
