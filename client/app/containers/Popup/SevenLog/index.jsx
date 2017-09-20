import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import Close from 'react-icons/lib/md/close';
import { formatDate } from 'lib/time';
import { generate711String } from 'lib/contractString';
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
              key={`${index + 1}`}
            >
              { (logs.length !== (index + 1)) && <div styleName="check-bar" />}
              <div styleName={index === 0 ? 'check-circle' : 'check-disable'} />
              <div styleName="check-content">
                <div styleName="check-text">{generate711String(log.action)}</div>
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
