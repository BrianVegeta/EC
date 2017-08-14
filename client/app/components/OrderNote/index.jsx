import React from 'react';
import PropTypes from 'prop-types';
import Picture from 'components/Picture';
import { formatCurrency } from 'lib/currency';
import { formatDateForOrder, rangeDiff } from 'lib/time';
import CSS from 'react-css-modules';

import styles from './styles.sass';

class OrderNote extends React.Component {

  static propTypes = {
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired,
    cidNo: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    itemImgUrl: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  };

  render() {
    const { startDate, endDate, cidNo, itemName, itemImgUrl, totalPrice } = this.props;
    return (
      <div styleName="ordernote-top-padding-style" className="clear">
        <div styleName="ordernote-pic-style">
          <Picture
            src={itemImgUrl}
            width={100}
          />
        </div>
        <div styleName="ordernote-content-style">
          <div styleName="ordernote-date-style">{`${formatDateForOrder(startDate)} - ${formatDateForOrder(endDate)} 共${rangeDiff(startDate, endDate, true)}天`}</div>
          <div styleName="ordernote-text-style">{`${itemName}`}</div>
          <div styleName="ordernote-text-style">{`總計：${formatCurrency(totalPrice)}`}</div>
          <div styleName="ordernote-hint-style">{`訂單編號：${cidNo}`}</div>
        </div>
      </div>
    );
  }
}

export default CSS(OrderNote, styles);
