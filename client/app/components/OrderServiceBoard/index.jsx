/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { userprofilePaths, orderDetail, reservationService } from 'lib/paths';

import Picture from 'components/Picture';
import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';
import { formatCurrency } from 'lib/currency';
import {
  generateOwnerServiceString,
  generateLesseeServiceString,
} from 'lib/contractString';
import { formatDate, rangeDiff } from 'lib/time';
import CSS from 'react-css-modules';
import classnames from 'classnames/bind';
import { popupScoreRating } from 'modules/popup';
import { doScore, resetAction } from 'modules/orderAction';
import { addToChatRoom } from 'modules/chatRooms';
import styles from './styles.sass';

const cx = classnames.bind(styles);

class OrderServiceBoard extends React.Component {
  static defaultProps = {
    photoHead: null,
    isOwner: false,
    lesseeReceive: false,
    targetScore: 0,
    targetComment: '',
  }

  static propTypes = {
    photoHead: PropTypes.string,
    photoName: PropTypes.string.isRequired,
    photoUid: PropTypes.string.isRequired,
    stage: PropTypes.number.isRequired,
    cid: PropTypes.number.isRequired,
    pid: PropTypes.number.isRequired,
    cidNo: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    itemImgUrl: PropTypes.string.isRequired,
    targetName: PropTypes.string.isRequired,
    targetUrl: PropTypes.string.isRequired,
    targetScore: PropTypes.number,
    targetComment: PropTypes.string,
    startDate: PropTypes.number.isRequired,
    endDate: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    unit: PropTypes.number.isRequired,
    isOwner: PropTypes.bool.isRequired,
    isRead: PropTypes.bool.isRequired,
    // lesseeReceive: PropTypes.bool,
    display: PropTypes.shape(
      {
        show_detail: PropTypes.bool.isRequired,
        can_edit: PropTypes.bool,
        can_pay: PropTypes.bool,
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
    }));
  }
  generateString() {
    const { isOwner, stage, startDate } = this.props;
    const objString = { title: '', text: '' };
    if (stage < 1000) {
      const generateString = isOwner ?
        generateOwnerServiceString : generateLesseeServiceString;
      return generateString(stage, startDate);
    } else if (stage > 1000 && stage < 3000) {
      const screenStage = stage % 100;
      if (screenStage < 11) {
        objString.title = '申訴中';
      } else {
        objString.title = '申訴完成';
      }
    } else {
      objString.title = '合約已取消';
    }
    return objString;
  }

  renderAction() {
    return this.props.isOwner === true ? this.renderOwnerActions() : this.renderLesseeActions();
  }

  renderOwnerActions() {
    const { display } = this.props;
    const { can_score, view_score } = display;
    const buttonProps = {
      size: 'sm',
      width: 'auto',
      style: {
        borderRadius: '100px',
        padding: '7px 7px',
        marginLeft: 10,
        display: 'inline-block',
      },
    };
    return (
      <div styleName="action-section">
        {can_score &&
          <FormButton
            colorType={'greenBorder'}
            {...buttonProps}
            content="評分"
            onClick={() => this.callScorePanel(false)}
          />
        }
        {view_score &&
          <FormButton
            colorType={'greenBorder'}
            {...buttonProps}
            content={'查看評價'}
            onClick={() => this.callScorePanel(true)}
          />
        }
        <FormButton
          colorType={'greenBorder'}
          {...buttonProps}
          content="查看詳情"
          onClick={() => browserHistory.push(
            orderDetail.indexPath(this.props.cid),
          )}
        />
      </div>
    );
  }

  renderLesseeActions() {
    const { display, cid, pid } = this.props;
    const { can_edit, can_pay, can_score, view_score } = display;
    const buttonConfig = {
      size: 'sm',
      width: 'auto',
      style: {
        borderRadius: '100px',
        padding: '7px 7px',
        marginLeft: 10,
        display: 'inline-block',
      },
    };
    return (
      <div styleName="action-section">
        {can_edit &&
          <FormButton
            colorType={'green'}
            {...buttonConfig}
            content={'修改預訂單'}
            onClick={() => {
              browserHistory.push(reservationService.indexPath(pid, cid));
            }}
          />
        }
        {can_pay &&
          <FormButton
            colorType={'green'}
            {...buttonConfig}
            content={'付款'}
            onClick={() => {}}
          />
        }
        {can_score &&
          <FormButton
            colorType={'green'}
            {...buttonConfig}
            content={'評分'}
            onClick={() => this.callScorePanel(false)}
          />
        }
        {view_score &&
          <FormButton
            colorType={'green'}
            {...buttonConfig}
            content={'查看評價'}
            onClick={() => this.callScorePanel(true)}
          />
        }
        <FormButton
          colorType={'greenBorder'}
          {...buttonConfig}
          content={'查看詳情'}
          onClick={() => browserHistory.push(orderDetail.indexPath(this.props.cid))}
        />
      </div>
    );
  }

  render() {
    const { photoHead, photoName, photoUid, cidNo, unit,
      itemName, itemImgUrl, startDate, endDate, totalPrice,
      display, isRead, dispatch } = this.props;
    const objectString = this.generateString();
    return (
      <div
        className={`clear ${cx('board-border', { colored: !isRead })}`}
      >
        <div styleName="header-section">
          <Link
            to={userprofilePaths.indexPath(photoUid)}
            styleName="header-avatar-style"
          >
            <Avatar
              src={photoHead}
              width={40}
            />
          </Link>
          <Link
            to={userprofilePaths.indexPath(photoUid)}
            styleName="header-name-style"
          >
            { photoName }
          </Link>
          <div styleName="header-chat-style" >
            <FormButton
              colorType={'greenBorder'}
              size="sm"
              style={{
                fontSize: 14,
                lineHeight: '14px',
                padding: '7px 15px',
              }}
              content={'私訊'}
              onClick={() => {
                dispatch(addToChatRoom({
                  uid: photoUid,
                  name: photoName,
                  picture: photoHead,
                }));
              }}
            />
          </div>
          <div styleName="mini-note-section">{objectString.title}</div>
        </div>
        <div
          styleName="body-section"
          className="clear"
        >
          <div styleName="pic-style">
            <Picture
              src={itemImgUrl}
              width={120}
            />
          </div>
          <div styleName="content-style">
            <div styleName="hint-style">{`訂單編號：${cidNo}`}</div>
            <div styleName="text-style">{`${itemName}`}</div>
            <div styleName="date-style">{`使用期間：${formatDate(startDate)}～${formatDate(endDate)}`}</div>
            <div styleName="price-section">
              <div styleName="unit-style">使用{rangeDiff(startDate, endDate, true)}天X{unit}件</div>
              <div styleName="price-style">總計 {formatCurrency(totalPrice)}</div>
            </div>
          </div>
        </div>
        <div styleName="hint-section">{objectString.text}</div>
        {this.renderAction(display)}
      </div>
    );
  }
}

export default CSS(OrderServiceBoard, styles);
