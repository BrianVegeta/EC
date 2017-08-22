import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import { Link } from 'react-router';
import BellIcon from 'react-icons/lib/md/notifications';
import colors from 'styles/colorExport.scss';
import { formatDate } from 'lib/time';
import styles from './styles.sass';

class NotifyActivityBoard extends React.Component {
  static defaultProps = {
    url: '/',
  }
  static propTypes = {
    type: PropTypes.number.isRequired,
    url: PropTypes.string,
    message: PropTypes.string.isRequired,
    createTime: PropTypes.number.isRequired,
    isRead: PropTypes.bool.isRequired,
  };
  renderMessage() {
    const { type, url, message } = this.props;
    switch (type) {
      case 1:
        return (
          <Link
            styleName="notify-activity-link"
            to={url}
          >
            {message}
          </Link>
        );
      default:
        return (<div>message</div>);
    }
  }
  render() {
    const { createTime, isRead } = this.props;
    const bellColor = isRead ? colors.placeholder : colors.orangeColor;
    return (
      <div
        styleName="notify-activity-border"
        className="clear"
      >
        <div styleName="notify-activity-icon">
          <BellIcon
            size={40}
            color={bellColor}
          />
        </div>
        <div styleName="notify-activity-content">
          {this.renderMessage()}
          <div styleName="notify-activity-time">
            {formatDate(createTime)}
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(NotifyActivityBoard, styles);
