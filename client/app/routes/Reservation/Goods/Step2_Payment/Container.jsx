import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import colors from 'styles/colorExport.scss';

import TitleWrapper from 'components/reservation/wrapper/Title';
import FormButton from 'components/FormButton';
import InputRadio from 'components/inputs/Radio';

import { popupBankInfoSetup } from 'modules/popup';
import { requestAccessCheck } from 'actions/accessCheckActions';

import Model from '../Model';
import BankInfoModel from '../Model/BankInfo';
import BankInfo from './wrappers/BankInfo';


const Container = styled.div`
  margin-bottom: 50px;
`;

const RadioContainer = styled.div`
  margin-bottom: 30px;
`;

const RadioGroup = styled.div`
  width: 564px;
`;

const RadioLabel = styled.div`
  color: ${colors.blackColor};
  font-size: 1.1em;
  margin-bottom: 5px;
`;

const Helper = styled.div`
  color: ${colors.middleBlack};
  font-size: 1.1em;
  line-height: 1.4em;
`;

const ATM_PAYMENT_HELPER_TEXT = '您可以在實體ATM或網路銀行轉帳，使用ShareApp指定的銀行帳號（虛擬帳號）';

class Form extends React.PureComponent {

  static propTypes = {
    item: myPropTypes.item.isRequired,
    reservation: myPropTypes.reservation.isRequired,
    myCoupons: myPropTypes.myCoupons.isRequired,
    secrecyVerification: PropTypes.shape({
      bankName: PropTypes.string,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onOpenSetup = this.onOpenSetup.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(
      requestAccessCheck((password) => {
        dispatch(
          popupBankInfoSetup({ password }, 600),
        );
      }),
    );
  }

  onOpenSetup() {
    // this.props.dispatch(
    //   modalBankSetup(),
    // );
  }

  render() {
    const {
      item,
      reservation,
      myCoupons,
      secrecyVerification,
      dispatch,
    } = this.props;

    const itemInstance = new Model(
      item,
      reservation,
      myCoupons,
      dispatch,
    );
    const {
      paymenttype,
    } = itemInstance;

    return (
      <Container>
        <TitleWrapper text="支付方式" />
        <RadioGroup>
          <RadioContainer>
            <InputRadio
              helper={<Helper>{ATM_PAYMENT_HELPER_TEXT}</Helper>}
              onChange={paymenttype.onAtmChange}
              checked={paymenttype.isAtm}
            >
              <RadioLabel>ATM銀行轉帳</RadioLabel>
            </InputRadio>
          </RadioContainer>
          <RadioContainer>
            <InputRadio
              onChange={paymenttype.onCreditCardChange}
              checked={paymenttype.isCreditCard}
            >
              <RadioLabel>信用卡支付</RadioLabel>
            </InputRadio>
          </RadioContainer>
        </RadioGroup>
        <BankInfo
          model={new BankInfoModel(secrecyVerification, dispatch)}
          onOpenSetup={this.onOpenSetup}
        />
        <FormButton
          colorType="orange"
          content="下一步"
          width={150}
          onClick={() => console.log(1)}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, item, reservation, myCoupons, modal, secrecyVerification } = state;
  return ({ environment, item, reservation, myCoupons, modal, secrecyVerification });
};
export default connect(mapStateToProps)(Form);
