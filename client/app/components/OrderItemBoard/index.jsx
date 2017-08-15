import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { detail } from 'lib/paths';

import Picture from 'components/Picture';
import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';
import { formatCurrency } from 'lib/currency';
import { formatDate, formatDateForOrder, rangeDiff } from 'lib/time';
import CSS from 'react-css-modules';

import styles from './styles.sass';

class OrderItemBoard extends React.Component {

  static propTypes = {
    photoHead: PropTypes.string.isRequired,
    photoName: PropTypes.string.isRequired,
    stage: PropTypes.number.isRequired,
    cid: PropTypes.number.isRequired,
    cidNo: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    itemImgUrl: PropTypes.string.isRequired,
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    unit: PropTypes.number.isRequired,
    display: PropTypes.shape(
      { show_detail: PropTypes.bool.isRequired },
    ).isRequired,
  };

  renderFooter() {
    return (
      <div
        styleName="oib-footer-section"
        className="clear"
      >
        {this.renderHint()}
        {this.renderAction()}
      </div>
    );
  }
  renderHint() {
    switch (this.props.stage) {
      case 1:
        return (
          <div styleName="oib-hint-section">
            請於{formatDateForOrder(this.props.startDate)}前點選「查看詳情」同意預定,遇時將自動取消
          </div>
        );
      default:
        return null;
    }
  }

  renderAction() {
    return (
      <div styleName="oib-action-section">
        <FormButton
          colorType={'greenBorder'}
          size="sm"
          content={'查看詳情'}
          onClick={() => browserHistory.push(detail.orderPath(this.props.cid))}
        />
      </div>
    )
  }

  render() {
    const { photoHead, photoName, stage, cidNo, unit,
      itemName, itemImgUrl, startDate, endDate, totalPrice, display } = this.props;
    return (
      <div
        styleName="oib-board-border"
        className="clear">
        <div styleName="oib-header-section">
          <div styleName="oib-header-avatar-style">
            <Avatar
              src={photoHead}
              width={40}
            />
          </div>
          <div styleName="oib-header-name-style" >{ photoName }</div>
          <div styleName="oib-header-chat-style" >
            <FormButton
              colorType={'greenBorder'}
              size="sm"
              style={{
                fontSize: 14,
                lineHeight: '14px',
                padding: '7px 15px',
              }}
              content={'私訊'}
              onClick={() => {}}
            />
          </div>
        </div>
        <div
          styleName="oib-body-section"
          className="clear"
        >
          <div styleName="oib-pic-style">
            <Picture
              src={itemImgUrl}
              width={120}
            />
          </div>
          <div styleName="oib-content-style">
            <div styleName="oib-hint-style">{`訂單編號：${cidNo}`}</div>
            <div styleName="oib-text-style">{`${itemName}`}</div>
            <div styleName="oib-date-style">{`使用期間：${formatDate(startDate)}～${formatDate(endDate)}`}</div>
            <div styleName="oib-price-section">
              <div styleName="oib-unit-style">使用{rangeDiff(startDate, endDate)}天X{unit}件</div>
              <div styleName="oib-price-style">總計 {formatCurrency(totalPrice)}</div>
            </div>
          </div>
        </div>
        {this.renderHint(stage, startDate)}
        {this.renderAction(display)}
      </div>
    );
  }
}

export default CSS(OrderItemBoard, styles);
