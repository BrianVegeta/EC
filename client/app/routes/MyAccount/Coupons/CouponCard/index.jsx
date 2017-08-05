import React from 'react';
import PropTypes from 'prop-types';

import { formatDate, rangeDiff, today } from 'lib/time';
import { formatCurrency } from 'lib/currency';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class CouponCard extends React.Component {

  static propTypes = {
    couponNo: PropTypes.string.isRequired,
    discount: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    expireAt: PropTypes.number.isRequired,
  };

  static calculateExpiration(expireTime) {
    const diffInDays = rangeDiff(today(), expireTime, false);
    if (diffInDays > 4) {
      return '';
    } else if (diffInDays > 0) {
      return "再過$'{diff_in_days}'天即將逾期，逾期後自動失效";
    } else if (diffInDays === 0) {
      return '只到今天喔～逾期後自動失效';
    }
    return '已過期不可使用';
  }

  render() {
    const { couponNo, discount, title, expireAt } = this.props;
    return (
      <table styleName="container">
        <tbody >
          <tr>
            <td
              styleName="price-container"
              rowSpan="4"
            >
              <span styleName="price">
                {formatCurrency(discount, '')}
              </span>
            </td>
            <td styleName="title">
              {title}
            </td>
          </tr>
          <tr>
            <td styleName="due-date">
              {couponNo}
            </td>
          </tr>
          <tr>
            <td styleName="due-date">
              使用期限：～ {formatDate(expireAt)}
            </td>
          </tr>
          <tr>
            <td styleName="expire-notice">
              {CouponCard.calculateExpiration(expireAt)}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default CSS(CouponCard, styles);
