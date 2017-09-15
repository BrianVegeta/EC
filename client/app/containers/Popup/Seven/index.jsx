import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import Close from 'react-icons/lib/md/close';
import { formatDate } from 'lib/time';
import styles from './styles.sass';

class ATMBank extends React.Component {

  static propTypes = {
    dispatchClose: PropTypes.func.isRequired,
    options: PropTypes.shape({
      max_send_time: PropTypes.number,
      orderno: PropTypes.string,
    }).isRequired,
  };

  render() {
    const { options, dispatchClose } = this.props;
    const { orderno, max_send_time } = options;
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
          <div styleName="title">7-11 寄件代碼</div>
        </div>
        <div styleName="content">
          <div styleName="serial_number">{orderno}</div>
          <div styleName="serial_hint">寄件代碼會在7日後{formatDate(max_send_time)}失效</div>
          <div styleName="sub-title">我該如何操作 7-11 的 ibon？</div>
          <div styleName="check-content">① 點選「購物／寄貨」按鈕</div>
          <div styleName="check-content">② 點選「交貨便」</div>
          <div styleName="check-content">③ 點選「輸入代碼」</div>
          <div styleName="check-content">④ 輸入「寄件代碼」</div>
          <div styleName="check-content">⑤ 列印交貨服務單及繳費即可</div>
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
