/* eslint-disable camelcase */
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
import classnames from 'classnames/bind';

import styles from './styles.sass';

const cx = classnames.bind(styles);

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
    isOwner: PropTypes.bool.isRequired,
    isRead: PropTypes.bool.isRequired,
    display: PropTypes.shape(
      {
        show_detail: PropTypes.bool.isRequired,
        can_ship: PropTypes.bool.isRequired,
        can_camera: PropTypes.bool.isRequired,
      },
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
      case 5:
        return (
          <div styleName="oib-hint-section">
            請於{formatDateForOrder(this.props.startDate)}前點選「安排出貨」
          </div>
        );
      default:
        return null;
    }
  }
  renderMiniNote() {
    return this.props.isOwner === true ? this.renderOwnerMiniNote() : this.renderLesseMiniNote();
  }

  renderOwnerMiniNote() {
    switch (this.props.stage) {
      case 1:
        return (
          <div styleName="oib-mini-note-section">
            收到預訂
          </div>
        );
      case 5:
        return (
          <div styleName="oib-mini-note-section">
            待出貨
          </div>
        );
      default:
        return null;
    }
  }

  renderLesseMiniNote() {
    switch (this.props.stage) {
      default:
        return null;
    }
  }

  renderAction() {
    return this.props.isOwner === true ? this.renderOwnerActions() : this.renderLesseeActions();
  }

  renderOwnerActions() {
    const { can_ship, can_camera } = this.props.display;
    const buttonConfig = {
      size: 'sm',
      width: 'auto',
      style: {
        padding: '7px 7px',
        marginLeft: 10,
        display: 'inline-block',
      },
    };
    return (
      <div styleName="oib-action-section">
        {can_camera &&
          <FormButton
            colorType={'greenBorder'}
            {...buttonConfig}
            content={'拍照'}
            onClick={() => {}}
          />
        }
        {can_ship &&
          <FormButton
            colorType={'greenBorder'}
            {...buttonConfig}
            content={'安排出貨'}
            onClick={() => {}}
          />
        }
        <FormButton
          colorType={'greenBorder'}
          {...buttonConfig}
          content={'查看詳情'}
          onClick={() => browserHistory.push(detail.orderPath(this.props.cid))}
        />
      </div>
    )
  }

  renderLesseeActions() {
    const buttonConfig = {
      size: 'sm',
      width: 'auto',
      style: {
        padding: '7px 7px',
        marginLeft: 10,
        display: 'inline-block',
      },
    };
    return (
      <div styleName="oib-action-section">
        <FormButton
          colorType={'greenBorder'}
          {...buttonConfig}
          content={'查看詳情'}
          onClick={() => browserHistory.push(detail.orderPath(this.props.cid))}
        />
      </div>
    )
  }

  render() {
    const { photoHead, photoName, stage, cidNo, unit,
      itemName, itemImgUrl, startDate, endDate, totalPrice, display, isRead } = this.props;
    return (
      <div
        className={`clear ${cx('oib-board-border', { colored: !isRead })}`}
      >
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
          {this.renderMiniNote()}
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
