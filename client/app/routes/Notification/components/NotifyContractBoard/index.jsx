import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';

import BellIcon from 'react-icons/lib/md/notifications';
import colors from 'styles/colorExport.scss';
import { formatDate } from 'lib/time';
import styles from './styles.sass';

class NotifyContractBoard extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    createTime: PropTypes.number.isRequired,
    isRead: PropTypes.bool.isRequired,
  };
  render() {
    const { message, createTime } = this.props;
    return (
      <div
        styleName="notify-contract-border"
        className="clear"
      >
        <div styleName="notify-contract-icon">
          <BellIcon
            size={40}
            color={colors.orangeColor}
          />
        </div>
        <div styleName="notify-contract-content">
          <div>{message}</div>
          <div styleName="notify-contract-time">
            {formatDate(createTime)}
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(NotifyContractBoard, styles);
