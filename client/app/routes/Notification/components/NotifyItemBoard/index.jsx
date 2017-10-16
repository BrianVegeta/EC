import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { formatDate } from 'lib/time';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import BellIcon from '../../../../components/Icons/Bell';
import WishIcon from '../../../../components/Icons/Wish';
import { TYPE_WISH } from '../../modules/notification';

const cx = classnames.bind(styles);
class NotifyActivityBoard extends React.Component {

  static propTypes = {
    type: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createTime: PropTypes.number.isRequired,
    isRead: PropTypes.bool.isRequired,
  }

  renderLinkable(message) {
    const { url } = this.props;
    return (
      <Link styleName="link" to={url} >
        {message}
      </Link>
    );
  }

  render() {
    const { type, createTime, isRead, url, message } = this.props;
    const Icon = (type === TYPE_WISH) ? WishIcon : BellIcon;
    return (
      <div className={`clear ${cx('container', { highlight: !isRead })}`} >
        <div styleName="icon">
          <Icon size={34} />
        </div>
        <div styleName="content">
          {url ? this.renderLinkable(message) : <div>message</div> }
          <div styleName="time">{formatDate(createTime)}</div>
        </div>
      </div>
    );
  }
}

export default CSS(NotifyActivityBoard, styles);
