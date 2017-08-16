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
        styleName="oseb-footer-section"
        className="clear"
      >
        {this.renderHint()}
        {this.renderAction()}
      </div>
    );
  }
  renderHint() {
    let str = '';
    if (this.props.stage < 100) {
      str = this.props.isOwner === true ? this.renderOwnerHint() : this.renderLesseeHint();
    } else if (this.props.stage < 3000) {
      const screen_id = this.props.stage % 100;
      str = (screen_id > 11) ? '申訴完成' : '申訴中';
    } else if (this.props.stage > 5000 && this.props.stage < 6000) {
      str = '取消交易';
    }
    return (<div styleName="oseb-hint-section">{str}</div>);
  }

  renderOwnerHint() {
    switch (this.props.stage) {
      case 1:
      case 2:
        return (`請在${formatDateForOrder(this.props.startDate)}前同意預訂單，逾時將自動取消。`);
      case 3:
        return ('在對方修改後，您才能進行同意。');
      case 4:
        return ('完成付款後，您將會收到信箱以及推播通知。');
      case 5:
      case 6:
      case 7:
        return (`將在${formatDateForOrder(this.props.startDate)}開始`);
      case 8:
      case 9:
      case 10:
        return ('');
      case 11:
        return ('交易完成！請給對方評價吧！');
      case 12:
      case 13:
        return ('您已完成評價，謝謝您使用ShareApp！');
      default:
        break;
    }
    return '';
  }

  renderLesseeHint() {
    switch (this.props.stage) {
      case 1:
      case 2:
        return ('在對方同意您的預訂後您才能進行付款。');
      case 3:
        return ('在您修改後，對方才可同意。');
      case 4:
        return (`請在${formatDate(this.props.startDate)}前完成付款，逾時將自動取消。`);
      case 5:
      case 6:
      case 7:
        return (`將在${formatDateForOrder(this.props.startDate)}開始`);
      case 8:
      case 9:
      case 10:
        return ('');
      case 11:
        return ('交易完成！請給對方評價吧！');
      case 12:
      case 13:
        return ('您已完成評價，謝謝您使用ShareApp！');
      default:
        break;
    }
    return ('');
  }


  renderMiniNote() {
    let str = '';
    if (this.props.stage < 100) {
      str = this.props.isOwner === true ? this.renderOwnerMiniNote() : this.renderLesseMiniNote();
    } else if (this.props.stage < 3000) {
      const screen_id = this.props.stage % 100;
      str = (screen_id > 11) ? '申訴完成' : '申訴中';
    } else if (this.props.stage > 5000 && this.props.stage < 6000) {
      str = '取消交易';
    }
    return (<div styleName="oseb-mini-note-section">{str}</div>);
  }

  renderOwnerMiniNote() {
    switch (this.props.stage) {
      case 1:
      case 2:
        return ('收到預訂');
      case 3:
        return ('待對方修改預訂單');
      case 4:
        return ('待付款');
      case 5:
      case 6:
      case 7:
        return ('等待交易開始');
      case 8:
      case 9:
      case 10:
        return ('交易進行中');
      case 11:
        return ('已完成');
      case 12:
      case 13:
        return ('已評分');
      default:
        break;
    }
    return ('');
  }

  renderLesseMiniNote() {
    switch (this.props.stage) {
      case 1:
      case 2:
        return ('等待對方同意');
      case 3:
        return ('待您修改預訂單');
      case 4:
        return ('尚未付款');
      case 5:
      case 6:
      case 7:
        return ('等待交易開始');
      case 8:
      case 9:
      case 10:
        return ('交易進行中');
      case 11:
        return ('已完成');
      case 12:
      case 13:
        return ('已評分');
      default:
        break;
    }
    return ('');
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
      <div styleName="oseb-action-section">
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
      <div styleName="oseb-action-section">
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
        className={`clear ${cx('oseb-board-border', { colored: !isRead })}`}
      >
        <div styleName="oseb-header-section">
          <div styleName="oseb-header-avatar-style">
            <Avatar
              src={photoHead}
              width={40}
            />
          </div>
          <div styleName="oseb-header-name-style" >{ photoName }</div>
          <div styleName="oseb-header-chat-style" >
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
          styleName="oseb-body-section"
          className="clear"
        >
          <div styleName="oseb-pic-style">
            <Picture
              src={itemImgUrl}
              width={120}
            />
          </div>
          <div styleName="oseb-content-style">
            <div styleName="oseb-hint-style">{`訂單編號：${cidNo}`}</div>
            <div styleName="oseb-text-style">{`${itemName}`}</div>
            <div styleName="oseb-date-style">{`使用期間：${formatDate(startDate)}～${formatDate(endDate)}`}</div>
            <div styleName="oseb-price-section">
              <div styleName="oseb-unit-style">使用{rangeDiff(startDate, endDate)}天X{unit}件</div>
              <div styleName="oseb-price-style">總計 {formatCurrency(totalPrice)}</div>
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
