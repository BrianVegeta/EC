import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'lib/time';
import CSS from 'react-css-modules';
import classnames from 'classnames/bind';
import colors from 'styles/colorExport.scss';
import styles from './styles.sass';
import BellIcon from '../../../../components/Icons/Bell';
import LoudspeakerIcon from '../../../../components/Icons/Loudspeaker';
import { TYPE_SYSTEM } from '../../modules/notification';


const cx = classnames.bind(styles);
const CONTENT_TYPE_LINK = 1;
class NotifyActivityBoard extends React.Component {

  static defaultProps = {
    url: '/',
    contentType: null,
  }

  static propTypes = {
    url: PropTypes.string,
    contentType: PropTypes.number,
    type: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    createTime: PropTypes.number.isRequired,
    isRead: PropTypes.bool.isRequired,
  };

  isSystemType() {
    return this.props.type === TYPE_SYSTEM;
  }

  isLinkable() {
    const { contentType } = this.props;
    return contentType && contentType === CONTENT_TYPE_LINK;
  }

  renderLinkable(message) {
    const { url } = this.props;
    return (
      <a href={url} styleName="link">
        {message}
      </a>
    );
  }

  render() {
    const { createTime, isRead, message } = this.props;
    const Icon = this.isSystemType() ? BellIcon : LoudspeakerIcon;
    return (
      <div className={`clear ${cx('container', { highlight: !isRead })}`} >
        <div styleName="icon">
          <Icon size={34} color={colors.primaryColor} />
        </div>
        <div styleName="content">
          {this.isLinkable() ? this.renderLinkable(message) : <div>{message}</div>}
          <div styleName="time">
            {formatDate(createTime)}
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(NotifyActivityBoard, styles);
