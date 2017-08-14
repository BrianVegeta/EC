import React from 'react';
import PropTypes from 'prop-types';
import Picture from 'components/Picture';
import { formatCurrency } from 'lib/currency';
import { formatDate } from 'lib/time';
import CSS from 'react-css-modules';

import styles from './styles.sass';

class WalletNote extends React.Component {

  static propTypes = {
    transactionDate: PropTypes.number.isRequired,
    cidNo: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    itemImgUrl: PropTypes.string.isRequired,
    transactionPrice: PropTypes.number.isRequired,
  };

  render() {
    const { transactionDate, cidNo, itemName, itemImgUrl, transactionPrice } = this.props;
    return (
      <div styleName="walletnote-top-padding-style" className="clear">
        <div styleName="walletnote-pic-style">
          <Picture
            src={itemImgUrl}
            width={100}
          />
        </div>
        <div styleName="walletnote-content-style">
          <div styleName="walletnote-date-style">{`${formatDate(transactionDate)}`}</div>
          <div styleName="walletnote-text-style">{`${itemName}`}</div>
          <div styleName="walletnote-text-style">{`總計：${formatCurrency(transactionPrice)}`}</div>
          <div styleName="walletnote-hint-style">{`訂單編號：${cidNo}`}</div>
        </div>
      </div>
    );
  }
}

export default CSS(WalletNote, styles);
