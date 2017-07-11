import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';

import TitleWrapper from 'components/reservation/wrapper/Title';
import ItemCard from 'components/reservation/wrapper/ItemCard';
import FormBlock from 'components/reservation/wrapper/FormBlock';
import CalculationPanel from 'components/reservation/wrapper/CalculationPanel';
import DeliverySingle from 'components/reservation/wrapper/DeliverySingle';
import FormButton from 'components/FormButton';

import OwnerProfile from './wrappers/OwnerProfile';
import During from './wrappers/During';
import Note from './wrappers/Note';

import Model from '../Model';

const Container = styled.div`
  margin-bottom: 50px;
`;

const SendAddressesContainer = styled.div`
  margin-top: -20px;
`;

class Form extends React.PureComponent {

  static propTypes = {
    item: myPropTypes.item.isRequired,
    reservation: myPropTypes.reservation.isRequired,
    myCoupons: myPropTypes.myCoupons.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const {
      item,
      reservation,
      myCoupons,
      dispatch,
    } = this.props;

    const itemInstance = new Model(
      item,
      reservation,
      myCoupons,
      dispatch,
    );
    const {
      itemCardModel,
      ownerModel,
      useDuringModel,
      calculationModel,
      noteModel,
      sendOptions,
      sendAddresses,
      returnOptions,
    } = itemInstance;

    return (
      <Container>
        <TitleWrapper text="確認預訂資訊" />
        <ItemCard model={itemCardModel} />
        <FormBlock>
          <OwnerProfile model={ownerModel} />
          <During dateRangeDesc={useDuringModel.duringDesc} />
        </FormBlock>
        <FormBlock title="交易明細">
          <CalculationPanel model={calculationModel} />
          <Note model={noteModel} />
        </FormBlock>
        <FormBlock title="物流方式">
          <DeliverySingle
            type="send"
            content={sendOptions.choosedDesc}
            helper={sendOptions.choosedHelper}
          />
          {sendOptions.needAddresses &&
            <SendAddressesContainer >
              <DeliverySingle
                label="地址"
                content={sendAddresses.fullAddresses}
              />
            </SendAddressesContainer>
          }
          <DeliverySingle
            type="return"
            content={returnOptions.choosedDesc}
            helper={returnOptions.choosedHelper}
          />
        </FormBlock>
        <FormBlock title="您的聯絡資訊">
          TEST
        </FormBlock>
        <FormBlock title="分享人守則">
          TEST
        </FormBlock>
        <FormBlock title="退訂政策">
          TEST
        </FormBlock>
        <FormBlock title="逾期金政策">
          TEST
        </FormBlock>
        <FormBlock hasBottomLine={false}>
          TEST
        </FormBlock>
        <FormButton
          colorType="orange"
          content="確認提交"
          width={150}
          onClick={() => console.log(1)}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, item, reservation, myCoupons } = state;
  return ({ environment, item, reservation, myCoupons });
};
export default connect(mapStateToProps)(Form);
