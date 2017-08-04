import React from 'react';
import PropTypes from 'prop-types';

import { formatDate } from 'lib/time';
import { formatCurrency } from 'lib/currency';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class CouponCard extends React.Component {

  static propTypes = {
    discount: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    expireAt: PropTypes.number.isRequired,
  };

  render() {
    const { discount, title, expireAt } = this.props;
    return (
      <table styleName="container">
        <tbody >
          <tr>
            <td
              styleName="price-container"
              rowSpan="3"
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
              使用期限：～ {formatDate(expireAt)}
            </td>
          </tr>
          <tr>
            <td styleName="expire-notice">
              再過3天即將逾期，逾期後自動失效
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default CSS(CouponCard, styles);
