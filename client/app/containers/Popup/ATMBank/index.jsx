import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class ATMBank extends React.Component {

  static propTypes = {
    dispatchClose: PropTypes.func.isRequired,
    options: PropTypes.shape({
      paidPrice: PropTypes.number,
      wireAccount: PropTypes.string,
    }).isRequired,
  };

  render() {
    console.log(this.props);
    const { options, dispatchClose } = this.props;
    const { amount, paymentinfo } = options;
    return (
      <div>
        <div>
          ATM付款資訊
        </div>
        <div>請使用網路銀行或實體ATM進行轉帳</div>
        <div>
          <span>虛擬帳號：</span>
          <span>{amount}</span>
        </div>
        <div>
          <span>銀行代碼：</span>
          <span>{paymentinfo}</span>
        </div>
        <div>
          <span>應付金額</span>
          <span>應付金額</span>
        </div>
        <div>ShareApp與玉山銀行、兆豐銀行合作，款項由銀行暫時託管以保障您的權益，請您放心。</div>
        <button
          className="button"
          onClick={dispatchClose}
        >
          知道了
        </button>
      </div>
    );
  }
}

export default CSS(ATMBank, styles);
