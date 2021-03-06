import React from 'react';
import PropTypes from 'prop-types';
// import myPropTypes from 'propTypes';

import FormContainer from 'components/Publish/FormContainer';
import FormButton from 'components/FormButton';
import InputRadio from 'components/Input/Radio';
import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_VALID,
} from 'components/Button/NextStep';
import AlertPanel from 'components/Alert/Panel';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);

class StepPayment extends React.Component {

  static propTypes = {
    isAtmChoosed: PropTypes.bool.isRequired,
    atmBankName: PropTypes.string.isRequired,
    isCreditCardChoosed: PropTypes.bool.isRequired,
    dispatchChooseAtm: PropTypes.func.isRequired,
    dispatchChooseCreditCard: PropTypes.func.isRequired,
    dispatchValidate: PropTypes.func.isRequired,
    dispatchTouchPath: PropTypes.func.isRequired,
    dispatchBankSetup: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.onNextStepClick = this.onNextStepClick.bind(this);
    this.state = {
      paymentTypeError: '',
      bankInfoError: '',
    };
  }

  componentDidMount() {
    this.props.dispatchTouchPath();
  }

  onNextStepClick() {
    const {
      dispatchValidate,
      nextStep,
    } = this.props;
    dispatchValidate().then(() => {
      this.setState({ paymentTypeError: '', bankInfoError: '' });
      nextStep();
    }).catch((errors) => {
      const { paymenttype, atm } = errors;
      this.setState({
        paymentTypeError: paymenttype || '',
        bankInfoError: atm || '',
      });
    });
  }

  render() {
    const {
      isAtmChoosed,
      isCreditCardChoosed,
      dispatchChooseAtm,
      dispatchChooseCreditCard,
      dispatchBankSetup,
      atmBankName,
      isValid,
    } = this.props;
    const { paymentTypeError, bankInfoError } = this.state;

    return (
      <FormContainer title="支付方式" >
        <div role="form">
          <div styleName="radio-group">
            <div styleName="radio-container">
              <InputRadio checked={isAtmChoosed} onChange={dispatchChooseAtm} >
                <div className={cx('radio-label')}>ATM 銀行轉帳</div>
                <div className={cx('label-helper')}>
                  您可以在實體ATM或網路銀行轉帳，使用ShareApp指定的銀行帳號（虛擬帳號）
                </div>
              </InputRadio>
            </div>
            <div styleName="radio-container">
              <InputRadio
                checked={isCreditCardChoosed}
                onChange={dispatchChooseCreditCard}
              >
                <div className={cx('radio-label')}>信用卡支付</div>
              </InputRadio>
            </div>
            <AlertPanel
              text={paymentTypeError}
              outerStyle={{ margin: '10px 0' }}
              width="auto"
            />
          </div>
          <div styleName="atm-detail-container">
            <div styleName="bank-container">
              <span styleName="bank-name">
                銀行帳戶：{atmBankName}
              </span>
              <FormButton
                colorType="greenBorder"
                size="sm"
                content="查看"
                width="auto"
                onClick={dispatchBankSetup}
              />
            </div>
            <div styleName="helper-text">
              當交易完成後，銀行會在每週一、三，將您的收入款項轉帳至您的銀行帳戶
            </div>
            <AlertPanel
              text={bankInfoError}
              outerStyle={{ margin: '10px 0' }}
              width="auto"
            />
          </div>
          <ButtonNextStep
            status={isValid ? STATUS_VALID : STATUS_DISABLE}
            onClick={this.onNextStepClick}
          />
        </div>
      </FormContainer>
    );
  }
}

export default CSS(StepPayment, styles);
