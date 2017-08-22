import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import { Link } from 'react-router';
import BellIcon from 'react-icons/lib/md/notifications';
import colors from 'styles/colorExport.scss';
import { formatDate } from 'lib/time';
import { orderRouter } from 'lib/paths';
import styles from './styles.sass';

class NotifyContractBoard extends React.Component {
  static propTypes = {
    cid: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    createTime: PropTypes.number.isRequired,
    isRead: PropTypes.bool.isRequired,
  };
  render() {
    const { cid, message, createTime, isRead } = this.props;
    const bellColor = isRead ? colors.placeholder : colors.orangeColor;

    return (
      <div
        styleName="notify-contract-border"
        className="clear"
      >
        <div styleName="notify-contract-icon">
          <BellIcon
            size={40}
            color={bellColor}
          />
        </div>
        <div styleName="notify-contract-content">
          <Link
            styleName="notify-contract-link"
            to={orderRouter.orderPath(cid)}
          >
            {message}
          </Link>
          <div styleName="notify-contract-time">
            {formatDate(createTime)}
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(NotifyContractBoard, styles);
