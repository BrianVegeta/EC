import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons/lib/fa/adjust';
import CSS from 'react-css-modules';

import classnames from 'classnames/bind';
import { formatDate } from 'lib/time'
import styles from './styles.sass';

const cx = classnames.bind(styles);
class Banner extends React.Component {

  static propTypes = {
    type: PropTypes.number.isRequired,
    startDate: PropTypes.number.isRequired,
  };

  render() {
    const { type, startDate } = this.props;
    const isOrderType = type < 100;
    let title = '';
    let text = '';
    if (type < 100) {
      title = '請同意預訂單';
      text = `請在${formatDate(startDate)}出貨前同意預訂單，逾時將自動取消。`;
    } else {
      title = 'ERROR~~~';
    }
    return (
      <div
        className={cx('banner_bkg', {
          'order-type': isOrderType,
          'sue-type': !isOrderType,
        })}
      >
        <div styleName="title_content">
          <div>
            <Icon styleName="icon" size={35} />
          </div>
          <div styleName="title">{ title }</div>
        </div>
        <div styleName="body_content">
          <span>{ text }</span>
        </div>
      </div>
    );
  }
}
export default CSS(Banner, styles);
