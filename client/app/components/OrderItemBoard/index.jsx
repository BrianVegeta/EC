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
    lesseeReceive: PropTypes.bool.isRequired,
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
    return this.props.isOwner === true ? this.renderOwnerHint() : this.renderLesseeHint();
  }

  renderOwnerHint() {
    let str = '';
    switch (this.props.stage) {
      case 1:
      case 2:
        str = `請在${formatDateForOrder(this.props.startDate)}前同意預訂單，逾時將自動取消。`;
        break;
      case 3:
        str = '在對方修改後，您才能進行同意。';
        break;
      case 4:
        str = '完成付款後，您將會收到信箱以及推播通知。';
        break;
      case 5:
        str = `請於${formatDateForOrder(this.props.startDate)}前安排出貨，為了保障您的權益，出貨前建議先拍下物品的狀態`;
        break;
      case 6:
      case 7:
        str = ''; // 對方已收到您的物品。 if lessee_receive
        break;
      case 8:
        str = '';
        break;
      case 9:
        str = '提醒您，當對方確認寄還後，您將會收到推播以及email通知。';
        break;
      case 10:
        str = '對方已將物品寄還。';
        break;
      case 11:
        str = '交易完成！請給對方評價吧！'
        break;
      case 12:
      case 13:
        str = '您已完成評價，謝謝您使用ShareApp！'
        break;
      default:
        return null;
    }
    return (
      <div styleName="oib-hint-section">{str}</div>
    );
  }

  renderLesseeHint() {
    let str = '';
    switch (this.props.stage) {
      case 1:
      case 2:
        str = '在對方同意您的預訂後您才能進行付款。'
        break;
      case 3:
        str = '在您修改後，對方才可同意。';
        break;
      case 4:
        str = `請在${formatDate(this.props.startDate)}前完成付款，逾時將自動取消。`;
        break;
      case 5:
        str = '您已成功付款，我們會通知對方進行出貨。';
        break;
      case 6:
      case 7:
        str = '提醒您，收到貨時建議將物品拍照，以避免交易糾紛。'; // 請於使用日期結束的隔日" + fc_parse.getFormattedDateShiftDay(data.leaseend, 1) + "進行物品寄還。 if lessee_receive
        break;
      case 8:
        str = '';
        break;
      case 9:
        str = '出貨時建議將物品拍照，拍照記錄能保障您的交易安全。';
        break;
      case 10:
        str = '';
        break;
      case 11:
        str = '交易完成！請給對方評價吧！'
        break;
      case 12:
      case 13:
        str = '您已完成評價，謝謝您使用ShareApp！'
        break;
      default:
        return null;
    }
    return (
      <div styleName="oib-hint-section">{str}</div>
    );
  }


  renderMiniNote() {
    return this.props.isOwner === true ? this.renderOwnerMiniNote() : this.renderLesseMiniNote();
  }

  renderOwnerMiniNote() {
    let str = '';
    switch (this.props.stage) {
      case 1:
      case 2:
        str = '收到預訂';
        break;
      case 3:
        str = '待對方修改預訂單';
        break;
      case 4:
        str = '待付款';
        break;
      case 5:
        str = '待出貨';
        break;
      case 6:
      case 7:
        str = '等待對方收貨'; // 已完成取件 if lessee_receive
        break;
      case 8:
        str = '交易進行中';
        break;
      case 9:
        str = '訂單已結束，等待對方寄還';
        break;
      case 10:
        str = '對方已寄還';
        break;
      case 11:
        str = '已完成'
        break;
      case 12:
      case 13:
        str = '已評分'
        break;
      default:
        return null;
    }
    return (
      <div styleName="oib-mini-note-section">{str}</div>
    );
  }

  renderLesseMiniNote() {
    let str = '';
    switch (this.props.stage) {
      case 1:
      case 2:
        str = '等待對方同意';
        break;
      case 3:
        str = '待您修改預訂單';
        break;
      case 4:
        str = '尚未付款';
        break;
      case 5:
        str = '待對方出貨';
        break;
      case 6:
      case 7:
        str = '對方已出貨'; // 你已完成取貨 if lessee_receive
        break;
      case 8:
        str = '交易進行中';
        break;
      case 9:
        str = '待寄還';
        break;
      case 10:
        str = '已寄還，待對方收件';
        break;
      case 11:
        str = '已完成'
        break;
      case 12:
      case 13:
        str = '已評分'
        break;
      default:
        return null;
    }
    return (
      <div styleName="oib-mini-note-section">{str}</div>
    );
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
