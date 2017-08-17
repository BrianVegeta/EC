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
import { popupScoreRating } from 'modules/popup';

import { doShipGoods, doScore, resetAction }
  from 'modules/orderAction';

import styles from './styles.sass';

const cx = classnames.bind(styles);

class OrderItemBoard extends React.Component {

  static defaultProps = {
    isOwner: false,
    lesseeReceive: false,
    targetScore: 0,
    targetComment: '',
  }

  static propTypes = {
    photoHead: PropTypes.string.isRequired,
    photoName: PropTypes.string.isRequired,
    stage: PropTypes.number.isRequired,
    cid: PropTypes.number.isRequired,
    cidNo: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    itemImgUrl: PropTypes.string.isRequired,
    targetName: PropTypes.string.isRequired,
    targetUrl: PropTypes.string.isRequired,
    targetScore: PropTypes.string,
    targetComment: PropTypes.string,
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    unit: PropTypes.number.isRequired,
    isOwner: PropTypes.bool,
    isRead: PropTypes.bool.isRequired,
    lesseeReceive: PropTypes.bool,
    display: PropTypes.shape(
      {
        show_detail: PropTypes.bool,
        can_ship: PropTypes.bool,
        can_edit: PropTypes.bool,
        can_pay: PropTypes.bool,
        can_camera: PropTypes.bool,
        can_score: PropTypes.bool,
        view_score: PropTypes.bool,
      },
    ).isRequired,
    dispatch: PropTypes.func.isRequired,
    dispatchRefresh: PropTypes.func.isRequired,
  };
  callScorePanel(isView) {
    this.props.dispatch(popupScoreRating({
      isView,
      targetName: this.props.targetName,
      targetScore: this.props.targetScore,
      targetComment: this.props.targetComment,
      targetUrl: this.props.targetUrl,
      onScore: (score, comment) => {
        this.props.dispatch(doScore(this.props.cid, score, comment))
        .then(() => {
          this.props.dispatch(resetAction());
          if (this.props.dispatchRefresh) {
            this.props.dispatchRefresh();
          }
        })
        .catch((error) => {
          alert(error);
        });
      },
    }))
  }
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
    let str = '';
    if (this.props.stage < 100) {
      str = this.props.isOwner === true ? this.renderOwnerHint() : this.renderLesseeHint();
    } else if (this.props.stage < 3000) {
      const screen_id = this.props.stage % 100;
      str = (screen_id > 11) ? '申訴完成' : '申訴中';
    } else if (this.props.stage > 5000 && this.props.stage < 6000) {
      str = '取消交易';
    }
    return (<div styleName="oib-hint-section">{str}</div>);
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
        return (`請於${formatDateForOrder(this.props.startDate)}前安排出貨，為了保障您的權益，出貨前建議先拍下物品的狀態`);
      case 6:
      case 7:
        // str = ''; // 對方已收到您的物品。 if lessee_receive
        return ('');
      case 8:
        return ('');
      case 9:
        return ('提醒您，當對方確認寄還後，您將會收到推播以及email通知。');
      case 10:
        return ('對方已將物品寄還。');
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
        return ('您已成功付款，我們會通知對方進行出貨。');
      case 6:
      case 7:
        return ('提醒您，收到貨時建議將物品拍照，以避免交易糾紛。'); // 請於使用日期結束的隔日" + fc_parse.getFormattedDateShiftDay(data.leaseend, 1) + "進行物品寄還。 if lessee_receive
      case 8:
        return '';
      case 9:
        return ('出貨時建議將物品拍照，拍照記錄能保障您的交易安全。');
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
    return (<div styleName="oib-mini-note-section">{str}</div>);
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
        return ('待出貨');
      case 6:
      case 7:
        return ('等待對方收貨'); // 已完成取件 if lessee_receive
      case 8:
        return ('交易進行中');
      case 9:
        return ('訂單已結束，等待對方寄還');
      case 10:
        return ('對方已寄還');
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
        return ('待對方出貨');
      case 6:
      case 7:
      //  str = '對方已出貨'; // 你已完成取貨 if lessee_receive
        return ('對方已出貨');
      case 8:
        return ('交易進行中');
      case 9:
        return ('待寄還');
      case 10:
        return ('已寄還，待對方收件');
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
    const { display } = this.props;
    const { can_ship, can_camera, can_score, view_score } = display;
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
            onClick={() => {
              this.props.dispatch(doShipGoods(this.props.cid))
              .then(() => {
                this.props.dispatch(resetAction());
                this.props.dispatchRefresh();
              })
              .catch((error) => {
                alert(error);
              });
            }}
          />
        }
        {can_score &&
          <FormButton
            colorType={'greenBorder'}
            {...buttonConfig}
            content={'評分'}
            onClick={() => this.callScorePanel(false)}
          />
        }
        {view_score &&
          <FormButton
            colorType={'greenBorder'}
            {...buttonConfig}
            content={'查看評價'}
            onClick={() => this.callScorePanel(true)}
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
    const { display } = this.props;
    const { can_edit, can_pay, can_score, view_score } = display;
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
        {can_edit &&
          <FormButton
            colorType={'greenBorder'}
            {...buttonConfig}
            content={'修改預訂單'}
            onClick={() => {}}
          />
        }
        {can_pay &&
          <FormButton
            colorType={'greenBorder'}
            {...buttonConfig}
            content={'付款'}
            onClick={() => {}}
          />
        }
        {can_score &&
          <FormButton
            colorType={'greenBorder'}
            {...buttonConfig}
            content={'評分'}
            onClick={() => this.callScorePanel(false)}
          />
        }
        {view_score &&
          <FormButton
            colorType={'greenBorder'}
            {...buttonConfig}
            content={'查看評價'}
            onClick={() => this.callScorePanel(true)}
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
