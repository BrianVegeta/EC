import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import Close from 'react-icons/lib/md/close';
import { formatDate } from 'lib/time';
import styles from './styles.sass';

class SevenLog extends React.Component {

  static propTypes = {
    dispatchClose: PropTypes.func.isRequired,
    options: PropTypes.shape({
      orderNo: PropTypes.string,
      logs: PropTypes.arrayOf(PropTypes.shape({
        action: PropTypes.string,
        action_time: PropTypes.number,
      },
      )),
    }).isRequired,
  };

  transform(action) {

    switch (action) {
      case 'ARRIVE_B_STORE':
        return '物品已配送至取件門市';
      case 'INSPECT_SHIPMENT_FROM_A_TO_B':
        return '出貨驗貨';
      case 'INSPECT_SHIPMENT_FROM_B_TO_C':
        return '退貨驗貨';
      case 'CANCEL':
        return '取消寄貨訂單';
      case 'COMPENSATE':
        return '已獲得賠償';
      case 'CREATE':
        return '建立寄貨單';
      case 'LEAVE_A_STORE':
        return '7-11交貨便運送物品中';
      case 'READY_RETURN_FROM_B_STORE':
        return '準備從收貨店退貨';
      case 'READY_RETURN_FROM_C_STORE':
        return '未領退貨準備退至物流中心';
      case 'RECEIVER_PICKUP':
        return '收件者已取貨';
      case 'RECEIVER_PAY':
        return '收件者已付費';
      case 'RETURN_FROM_B_STORE':
        return '已從收貨店退貨';
      case 'RETURN_SENDER_PAY':
        return '退貨已付款';
      case 'RETURN_SENDER_PICKUP':
        return '已領取退貨';
      case 'RETURN_FROM_C_STORE':
        return '已離開退貨店';
      case 'SENDER_SEND':
        return '寄件者已寄出';
      case 'SENDER_PAY':
        return '寄件者已到店寄件';
      case 'WAITING_FOR_UPDATE_B_STORE':
        return '等待修改收貨店';
      case 'WAITING_FOR_UPDATE_C_STORE':
        return '等待修改退貨店';
      default:
        return '';
    }
  }
  render() {
    const { options, dispatchClose } = this.props;
    const { logs, orderNo } = options;
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
          <div styleName="title">物流資訊</div>
        </div>
        <div styleName="content">
          <div styleName="serial_hint">7-11 寄件代碼：</div>
          <div styleName="serial_number">{orderNo}</div>
          {logs && logs.map((log, index) => (
            <div
              styleName="check-container"
              key={ index + 1 }
            >
              { (logs.length !== (index + 1)) && <div styleName="check-bar" />}
              <div styleName={index === 0 ? 'check-circle' : 'check-disable'} />
              <div styleName="check-content">
                <div styleName="check-text">{this.transform(log.action)}</div>
                <div styleName="check-time">{formatDate(log.action_time, 'YYYY/MM/DD HH:mm')}</div>
              </div>
            </div>
          ))}
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

export default CSS(SevenLog, styles);
