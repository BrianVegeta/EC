import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import Close from 'react-icons/lib/md/close';
import { formatCurrency } from 'lib/currency';
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
    const { options, dispatchClose } = this.props;
    const { amount, paymentinfo } = options;
    return (
      <div styleName="container">
        <div
          styleName="nav"
          className="clear"
        >
          <button
            className="button"
            styleName="close-button"
            onClick={dispatchClose}
          >
            <Close />
          </button>
          <div styleName="title">ATM付款資訊</div>
        </div>
        <div styleName="content">
          <div styleName="hint1">請使用網路銀行或實體ATM進行轉帳</div>
          <div styleName="sub-content">
            <span styleName="sub-text">虛擬帳號：</span>
            <span styleName="sub-value">{paymentinfo}</span>
          </div>
          <div styleName="sub-content">
            <span styleName="sub-text">銀行代碼：</span>
            <span styleName="sub-value">808 玉山銀行</span>
          </div>
          <div styleName="price-content">
            <span styleName="price-text">應付金額</span>
            <span styleName="price-value">{formatCurrency(amount)}</span>
          </div>
          <div styleName="hint2">ShareApp與玉山銀行、兆豐銀行合作，款項由銀行暫時託管以保障您的權益，請您放心。</div>
          <button
            styleName="done"
            className="button"
            onClick={dispatchClose}
          >
            知道了
          </button>
        </div>
      </div>
    );
  }
}

export default CSS(ATMBank, styles);
