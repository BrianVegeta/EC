/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { orderDetail, reservationUsedGoods }
 from 'lib/paths';

import Picture from 'components/Picture';
import Avatar from 'components/Avatar';
import FormButton from 'components/FormButton';
import { formatCurrency } from 'lib/currency';
import { generateOwnerUsedItemString, generateLesseeUsedItemString }
  from 'lib/contractString';
import CSS from 'react-css-modules';
import classnames from 'classnames/bind';
import { popupScoreRating, popupATMBank } from 'modules/popup';
import { addToChatRoom } from 'modules/chatRooms';
import { doShipGoods, doScore, resetAction, doCreditCardPayment, doATMPayment, doReceiveConfirm }
  from 'modules/orderAction';

import styles from './styles.sass';

const cx = classnames.bind(styles);

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
    isOwner: PropTypes.bool,
    isRead: PropTypes.bool.isRequired,
    order: PropTypes.shape({
      cid: PropTypes.number,
    }).isRequired,

    // paymenttype: PropTypes.number.isRequired,
    // stage: PropTypes.number.isRequired,
    // cid: PropTypes.number.isRequired,
    // pid: PropTypes.number.isRequired,
    // cidNo: PropTypes.string.isRequired,
    // itemName: PropTypes.string.isRequired,
    // itemImgUrl: PropTypes.string.isRequired,
    // targetName: PropTypes.string.isRequired,
    // targetUrl: PropTypes.string.isRequired,
    // targetScore: PropTypes.number,
    // targetComment: PropTypes.string,
    // totalPrice: PropTypes.number.isRequired,
    // unit: PropTypes.number.isRequired,
    //
    // lesseeReceive: PropTypes.bool,
    // createTime: PropTypes.number.isRequired,
    // display: PropTypes.shape(
    //   {
    //     show_detail: PropTypes.bool,
    //     can_ship: PropTypes.bool,
    //     can_edit: PropTypes.bool,
    //     can_pay: PropTypes.bool,
    //     can_camera: PropTypes.bool,
    //     can_score: PropTypes.bool,
    //     view_score: PropTypes.bool,
    //   },
    // ).isRequired,
    dispatch: PropTypes.func.isRequired,
    dispatchRefresh: PropTypes.func.isRequired,
  };

  generateEditAddress() {
    const { order: { cid, pid } } = this.props;
    return () => browserHistory.push(reservationUsedGoods.indexPath(pid, cid));
  }

  generatePayment() {
    const { order: { paymenttype, cid, dispatch } } = this.props;

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
    const { isOwner,
      order: { cid, owner_comment, lessee_comment, lesseescore, ownerscore } } = this.props;
    const targetScore = isOwner ? lesseescore : ownerscore;
    const targetComment = isOwner ? lessee_comment : owner_comment;
    this.props.dispatch(popupScoreRating({
      isView,
      targetName: this.props.photoName,
      targetScore,
      targetComment,
      targetUrl: this.props.photoHead,
      onScore: (score, comment) => {
        this.props.dispatch(doScore(cid, score, comment))
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
    const { isOwner,
      order: { contractstage, lessee_receive, lesseescore, ownerscore } } = this.props;
    const objString = { title: '', text: '' };
    if (contractstage < 1000) {
      if (isOwner) {
        return generateOwnerUsedItemString(contractstage, lessee_receive, (lesseescore));
      }
      return generateLesseeUsedItemString(contractstage, lessee_receive, (ownerscore));
    } else if (contractstage > 1000 && contractstage < 3000) {
      const screenStage = contractstage % 100;
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
    const { order: { display, cid } } = this.props;
    const { can_ship, can_score, view_score } = display;
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
      <div styleName="oib-action-section">
        {can_ship &&
          <FormButton
            colorType={'green'}
            {...buttonConfig}
            content={'安排出貨'}
            onClick={() => {
              this.props.dispatch(doShipGoods(cid))
              .then(() => {
                this.props.dispatch(resetAction());
                if (this.props.dispatchRefresh) {
                  this.props.dispatchRefresh();
                }
              })
              .catch((error) => {
                alert(error);
              });
            }}
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
          onClick={() => browserHistory.push(orderDetail.indexPath(cid))}
        />
      </div>
    );
  }

  renderLesseeActions() {
    const { order: { display, cid } } = this.props;
    const { can_edit, can_pay, can_ship_confirm, can_score, view_score } = display;
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
      <div styleName="oib-action-section">
        {can_edit &&
          <FormButton
            colorType={'green'}
            {...buttonConfig}
            content={'修改預訂單'}
            onClick={this.generateEditAddress()}
          />
        }
        {can_pay &&
          <FormButton
            colorType={'green'}
            {...buttonConfig}
            content={'付款'}
            onClick={this.generatePayment()}
          />
        }
        {can_ship_confirm &&
          <FormButton
            colorType={'green'}
            {...buttonConfig}
            content={'確認收貨'}
            onClick={() => {
              this.props.dispatch(doReceiveConfirm(cid))
              .then(() => {
                this.props.dispatch(resetAction());
                if (this.props.dispatchRefresh) {
                  this.props.dispatchRefresh();
                }
              })
              .catch((error) => {
                alert(error);
              });
            }}
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
          onClick={() => browserHistory.push(orderDetail.indexPath(cid))}
        />
      </div>
    );
  }

  render() {
    const { photoHead, photoName, photoUid, isRead, order: {
      cid_no, unit,
      pname, img1, lesseepayfee }, dispatch } = this.props;
    const objectString = this.generateString();
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
              onClick={() => dispatch(addToChatRoom({
                uid: photoUid,
                name: photoName,
                picture: photoHead,
              }))}
            />
          </div>
          <div styleName="oib-mini-note-section">{objectString.title}</div>
        </div>
        <div
          styleName="oib-body-section"
          className="clear"
        >
          <div styleName="oib-pic-style">
            <Picture
              src={img1}
              width={120}
            />
          </div>
          <div styleName="oib-content-style">
            <div styleName="oib-hint-style">{`訂單編號：${cid_no}`}</div>
            <div styleName="oib-text-style">{`${pname}`}</div>
            <div styleName="oib-price-section">
              <div styleName="oib-unit-style">{unit}件</div>
              <div styleName="oib-price-style">總計 {formatCurrency(lesseepayfee)}</div>
            </div>
          </div>
        </div>
        <div styleName="oib-hint-section">{objectString.text}</div>
        {this.renderAction()}
      </div>
    );
  }
}

export default CSS(OrderItemBoard, styles);
