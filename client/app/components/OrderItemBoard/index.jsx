/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import {
  userprofilePaths,
  orderDetail,
  reservationGoods,
  reservationService,
  reservationSpace,
} from 'lib/paths';
import swal, { orderConfig, errorConfig } from 'lib/swal';
import Picture from 'components/Picture';
import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';
import { formatCurrency } from 'lib/currency';
import {
  generateOwnerItemString, generateLesseeItemString,
} from 'lib/contractString';
import { formatDate, rangeDiff } from 'lib/time';
import { popupScoreRating, popupATMBank, popupSevenNo } from 'modules/popup';
import { addToChatRoom } from 'modules/chatRooms';
import {
  doShipGoods,
  doReturn,
  doScore,
  resetAction,
  doCreditCardPayment,
  doATMPayment,
  doReceiveConfirm,
  getShipOrder,
} from 'modules/orderAction';
import CSS from 'react-css-modules';
import classnames from 'classnames/bind';
import styles from './styles.sass';


const cx = classnames.bind(styles);
const buttonStyle = {
  borderRadius: '100px',
  padding: '7px 16px',
  marginLeft: 10,
  display: 'inline-block',
};
const buttonConfig = {
  size: 'sm',
  width: 'auto',
  style: buttonStyle,
};
class OrderItemBoard extends React.Component {

  static defaultProps = {
    isOwner: false,
    lesseeReceive: false,
    targetScore: 0,
    targetComment: '',
    photoHead: '',
  }

  static propTypes = {
    photoHead: PropTypes.string,
    photoName: PropTypes.string.isRequired,
    photoUid: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    paymenttype: PropTypes.number.isRequired,
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
    isOwner: PropTypes.bool,
    isRead: PropTypes.bool.isRequired,
    // lesseeReceive: PropTypes.bool,
    display: PropTypes.shape(
      {
        show_detail: PropTypes.bool,
        can_ship: PropTypes.bool,
        can_711: PropTypes.bool,
        can_ship_confirm: PropTypes.bool,
        can_edit: PropTypes.bool,
        can_pay: PropTypes.bool,
        can_score: PropTypes.bool,
        view_score: PropTypes.bool,
      },
    ).isRequired,
    dispatch: PropTypes.func.isRequired,
    dispatchRefresh: PropTypes.func.isRequired,
  };

  generateEditAddress() {
    const { type, cid, pid } = this.props;
    switch (type) {
      case 'ITEM':
        return () => browserHistory.push(reservationGoods.indexPath(pid, cid));
      case 'SERVICE':
        return () => browserHistory.push(reservationService.indexPath(pid, cid));
      case 'SPACE':
        return () => browserHistory.push(reservationSpace.indexPath(pid, cid));
      default:
        return () => {};
    }
  }

  generatePayment() {
    const { paymenttype, cid, dispatch } = this.props;

    switch (paymenttype) {
      case 4:
        return () => {
          dispatch(doCreditCardPayment(cid))
          .catch((error) => {
            alert(error);
          });
        };
      case 1:
        return () => {
          const options = {};
          dispatch(popupATMBank(options));
          dispatch(doATMPayment(cid));
        };
      default:
        return () => {};
    }
  }

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
      if (isOwner) {
        return generateOwnerItemString(stage, startDate);
      }
      return generateLesseeItemString(stage, startDate);
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
    const { isOwner } = this.props;
    return isOwner ? this.renderOwnerActions() : this.renderLesseeActions();
  }

  renderOwnerActions() {
    const {
      cid,
      display,
      dispatch,
      dispatchRefresh,
    } = this.props;
    const {
      can_ship,
      can_score,
      can_711,
      can_return_confirm,
      view_score,
    } = display;
    return (
      <div styleName="action-section">
        {
          can_ship &&
          <FormButton
            colorType={'green'}
            {...buttonConfig}
            content={'安排出貨'}
            onClick={() => {
              swal(orderConfig('出貨前是否要上傳照片紀錄？')).then(() => {
                browserHistory.push(orderDetail.indexPath(cid));
              }).catch(() => {
                dispatch(doShipGoods(cid)).then(() => {
                  this.props.dispatch(resetAction());
                  this.props.dispatchRefresh();
                }).catch((error) => {
                  swal(errorConfig('出貨失敗', error));
                });
              });
            }}
          />
        }
        {
          can_711 &&
          <FormButton
            {...buttonConfig}
            colorType="green"
            content="寄件代碼"
            onClick={() => {
              dispatch(popupSevenNo({ options: {} }));
              dispatch(getShipOrder(cid, 'OWNER_SEND'));
            }}
          />
        }
        {
          can_return_confirm &&
          <FormButton
            {...buttonConfig}
            colorType="green"
            content="確認還貨"
            onClick={() => {
              swal(orderConfig('確認前是否要上傳照片紀錄？')).then(() => {
                browserHistory.push(orderDetail.indexPath(cid));
              }).catch(() => {
                dispatch(doReceiveConfirm(cid)).then(() => {
                  dispatch(resetAction());
                  dispatchRefresh();
                }).catch((error) => {
                  swal(errorConfig('確認還貨失敗', error));
                });
              });
            }}
          />
        }
        {
          can_711 &&
          <FormButton
            {...buttonConfig}
            colorType="green"
            content="寄件代碼"
            onClick={() => {
              dispatch(popupSevenNo({ options: {} }));
              dispatch(getShipOrder(cid, 'LESSEE_SEND'));
            }}
          />
        }
        {
          can_score &&
          <FormButton
            {...buttonConfig}
            colorType="green"
            content="評分"
            onClick={() => this.callScorePanel(false)}
          />
        }
        {
          view_score &&
          <FormButton
            {...buttonConfig}
            colorType="green"
            content="查看評價"
            onClick={() => this.callScorePanel(true)}
          />
        }
        <FormButton
          {...buttonConfig}
          colorType="greenBorder"
          content="查看詳情"
          onClick={() => browserHistory.push(orderDetail.indexPath(cid))}
        />
      </div>
    );
  }

  renderLesseeActions() {
    const {
      display,
      pid,
      cid,
      dispatch,
      dispatchRefresh,
    } = this.props;
    const {
      can_edit,
      can_pay,
      can_ship_confirm,
      can_return,
      can_score,
      view_score,
    } = display;
    return (
      <div styleName="action-section">
        {
          can_edit &&
          <FormButton
            {...buttonConfig}
            colorType="green"
            content="修改預訂單"
            onClick={() => {
              browserHistory.push(reservationGoods.indexPath(pid, cid));
            }}
          />
        }
        {
          can_pay &&
          <FormButton
            {...buttonConfig}
            colorType="green"
            content="付款"
            onClick={this.generatePayment()}
          />
        }
        {
          can_ship_confirm &&
          <FormButton
            {...buttonConfig}
            colorType="green"
            content="確認收貨"
            onClick={() => {
              swal(orderConfig('確認前是否要上傳照片紀錄？')).then(() => {
                browserHistory.push(orderDetail.indexPath(cid));
              }).catch(() => {
                dispatch(doReceiveConfirm(cid)).then(() => {
                  dispatch(resetAction());
                  dispatchRefresh();
                }).catch((error) => {
                  swal(errorConfig('確認收貨失敗', error));
                });
              });
            }}
          />
        }
        {
          can_return &&
          <FormButton
            {...buttonConfig}
            colorType="green"
            content="還貨"
            onClick={() => {
              swal(orderConfig('還貨前是否要上傳照片紀錄？')).then(() => {
                browserHistory.push(orderDetail.indexPath(cid));
              }).catch(() => {
                dispatch(doReturn(cid)).then(() => {
                  dispatch(resetAction());
                  dispatchRefresh();
                }).catch((error) => {
                  swal(errorConfig('還貨失敗', error));
                });
              });
            }}
          />
        }
        {
          can_score &&
          <FormButton
            {...buttonConfig}
            colorType="green"
            content="評分"
            onClick={() => this.callScorePanel(false)}
          />
        }
        {
          view_score &&
          <FormButton
            {...buttonConfig}
            colorType="green"
            content="查看評價"
            onClick={() => this.callScorePanel(true)}
          />
        }
        <FormButton
          {...buttonConfig}
          colorType="greenBorder"
          content="查看詳情"
          onClick={() => browserHistory.push(orderDetail.indexPath(cid))}
        />
      </div>
    );
  }

  render() {
    const {
      photoHead, photoName, photoUid, cidNo, unit,
      itemName, itemImgUrl, startDate, endDate, totalPrice,
      display, isRead, dispatch,
    } = this.props;
    const objectString = this.generateString();
    return (
      <div className={`clear ${cx('board-border', { colored: !isRead })}`}>
        <div styleName="header-section">
          <Link
            to={userprofilePaths.indexPath(photoUid)}
            styleName="header-avatar-style"
          >
            <Avatar src={photoHead} width={40} />
          </Link>
          <Link
            to={userprofilePaths.indexPath(photoUid)}
            styleName="header-name-style"
          >
            { photoName }
          </Link>
          <div styleName="header-chat-style" >
            <FormButton
              colorType="greenBorder"
              size="sm"
              style={{ fontSize: 14, lineHeight: '14px', padding: '7px 15px' }}
              content="私訊"
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
        <div className="clear" styleName="body-section" >
          <div styleName="pic-style">
            <Picture src={itemImgUrl} width={120} />
          </div>
          <div styleName="content-style">
            <div styleName="hint-style">{`訂單編號：${cidNo}`}</div>
            <div styleName="text-style">{`${itemName}`}</div>
            <div styleName="date-style">
              使用期間：${formatDate(startDate)}～${formatDate(endDate)}
            </div>
            <div styleName="price-section">
              <div styleName="unit-style">
                使用{rangeDiff(startDate, endDate, true)}天X{unit}件
              </div>
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

export default CSS(OrderItemBoard, styles);
