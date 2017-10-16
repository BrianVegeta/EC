import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { formatDate } from 'lib/time';
import { orderDetail } from 'lib/paths';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Picture from '../../../../components/Picture';


const cx = classnames.bind(styles);
class NotifyContractBoard extends React.Component {

  static propTypes = {
    cid: PropTypes.number.isRequired,
    itemImage: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createTime: PropTypes.number.isRequired,
    isRead: PropTypes.bool.isRequired,
  };

  render() {
    const { cid, message, createTime, itemImage, isRead } = this.props;
    return (
      <div className={`clear ${cx('container', { highlight: !isRead })}`} >
        <Link to={orderDetail.indexPath(cid)} styleName="cover">
          <Picture src={itemImage} />
        </Link>
        <div styleName="content">
          <Link
            styleName="link"
            to={orderDetail.indexPath(cid)}
          >
            {message}
          </Link>
          <div styleName="time">{formatDate(createTime)}</div>
        </div>
      </div>
    );
  }
}

export default CSS(NotifyContractBoard, styles);
