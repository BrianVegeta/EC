import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons/lib/fa/adjust';
import CSS from 'react-css-modules';

import classnames from 'classnames/bind';
import { formatDate } from 'lib/time'
import styles from './styles.sass';

const cx = classnames.bind(styles);
class Banner extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    contractstage: PropTypes.number.isRequired,
    startDate: PropTypes.number.isRequired,
  };

  generateString() {
    switch (this.props.type) {
      case 'ITEM':
        return this.generateItemString();
      case 'SERVICE':
        return this.generateServiceString();
      case 'SPACE':
        return this.generateSpaceString();
      default:
        return ({ title: '', text: '' });
    }
  }

  generateOwnerItemString() {
    let title = '';
    let text = '';
    switch (this.props.contractstage) {
      case 1:
      case 2:
        title = '請同意預訂單';
        text = `請在${formatDate(this.props.startDate)}出貨前同意預訂單，逾時將自動取消。`;
        break;
      case 3:
        title = '待對方修改預訂單';
        text = '在對方修改後，您才能進行同意。';
        break;
      case 4:
        title = '待付款';
        text = '完成付款後，您將會收到信箱以及推播通知。';
        break;
      case 5:
        title = '待出貨';
        text = `請於${formatDateForOrder(this.props.startDate)}前安排出貨，為了保障您的權益，出貨前建議先拍下物品的狀態`;;
        break;
      case 6:
      case 7:
        title = '等待對方收貨';
        text = '';
        break;
      case 8:
        title = '交易進行中';
        text = '';
        break;
      case 9:
        title = '訂單已結束，等待對方寄還';
        text = '提醒您，當對方確認寄還後，您將會收到推播以及email通知。';
        break;
      case 10:
        title = '對方已寄還';
        text = '對方已將物品寄還。';
        break;
      case 11:
        title = '已完成';
        text = '對方已將物品寄還。';
        break;
      case 12:
      case 13:
        title = '已評分';
        text = '您已完成評價，謝謝您使用ShareApp！';
        break;
      default:
        break;
    }

    return ({ title, text });
  }

  generateLesseeItemString() {
      let title = '';
      let text = '';
      switch (this.props.contractstage) {
        case 1:
        case 2:
          title = '等待對方同意';
          text = '在對方同意您的預訂後您才能進行付款。';
          break;
        case 3:
          title = '待您修改預訂單';
          text = '在您修改後，對方才可同意。';
          break;
        case 4:
          title = '尚未付款';
          text = `請在${formatDate(this.props.startDate)}前完成付款，逾時將自動取消。`;
          break;
        case 5:
          title = '待對方出貨';
          text = '您已成功付款，我們會通知對方進行出貨。';
          break;
        case 6:
        case 7:
          title = '對方已出貨';
          text = '';
          break;
        case 8:
          title = '交易進行中';
          text = '';
          break;
        case 9:
          title = '待寄還';
          text = '出貨時建議將物品拍照，拍照記錄能保障您的交易安全。';
          break;
        case 10:
          title = '已寄還，待對方收件';
          text = '';
          break;
        case 11:
          title = '已完成';
          text = '交易完成！請給對方評價吧！';
          break;
        case 12:
        case 13:
          title = '已評分';
          text = '您已完成評價，謝謝您使用ShareApp！';
          break;
        default:
          break;
      }

      return ({ title, text });
    }
  
  generateOwnerServiceString() {
    let title = '';
    let text = '';
    switch (this.props.contractstage) {
      case 1:
      case 2:
        title = '請同意預訂單';
        text = `請在${formatDateForOrder(this.props.startDate)}前同意預訂單，逾時將自動取消。`;
        break;
      case 3:
        title = '待對方修改預訂單';
        text = '在對方修改後，您才能進行同意';
        break;
      case 4:
        title = '待付款';
        text = '完成付款後，您將會收到信箱以及推播通知。';
        break;
      case 5:
      case 6:
      case 7:
        title = '等待交易開始';
        text = `將在${formatDateForOrder(this.props.startDate)}開始`;
        break;
      case 8:
      case 9:
      case 10:
        title = '交易進行中';
        text = '';
        break;
      case 11:
        title = '已完成';
        text = '交易完成！請給對方評價吧！';
        break;
      case 12:
      case 13:
        title = '已評分';
        text = '您已完成評價，謝謝您使用ShareApp！';
        break;
      default:
        break;
    }

    return ({ title, text });
  }
  generateLesseeServiceString() {
      let title = '';
      let text = '';
      switch (this.props.contractstage) {
        case 1:
        case 2:
          title = '請同意預訂單';
          text = '在對方同意您的預訂後您才能進行付款。';
          break;
        case 3:
          title = '待您修改預訂單';
          text = '在您修改後，對方才可同意。';
          break;
        case 4:
          title = '尚未付款';
          text = `請在${formatDate(this.props.startDate)}前完成付款，逾時將自動取消。`;
          break;
        case 5:
        case 6:
        case 7:
          title = '等待交易開始';
          text = `將在${formatDateForOrder(this.props.startDate)}開始`;
          break;
        case 8:
        case 9:
        case 10:
          title = '交易進行中';
          text = '';
          break;
        case 11:
          title = '已完成';
          text = '交易完成！請給對方評價吧！';
          break;
        case 12:
        case 13:
          title = '已評分';
          text = '您已完成評價，謝謝您使用ShareApp！';
          break;
        default:
          break;
      }

      return ({ title, text });
    }
  generateOwnerSpaceString() {
      let title = '';
      let text = '';
      switch (this.props.contractstage) {
        case 1:
        case 2:
          title = '請同意預訂單';
          text = `請在${formatDateForOrder(this.props.startDate)}前同意預訂單，逾時將自動取消。`;
          break;
        case 3:
          title = '待對方修改預訂單';
          text = '在對方修改後，您才能進行同意';
          break;
        case 4:
          title = '待付款';
          text = '完成付款後，您將會收到信箱以及推播通知。';
          break;
        case 5:
        case 6:
        case 7:
          title = '等待交易開始';
          text = `將在${formatDateForOrder(this.props.startDate)}開始`;
          break;
        case 8:
        case 9:
        case 10:
          title = '交易進行中';
          text = '';
          break;
        case 11:
          title = '已完成';
          text = '交易完成！請給對方評價吧！';
          break;
        case 12:
        case 13:
          title = '已評分';
          text = '您已完成評價，謝謝您使用ShareApp！';
          break;
        default:
          break;
      }

      return ({ title, text });
    }
    generateLesseeSpaceString() {
        let title = '';
        let text = '';
        switch (this.props.contractstage) {
          case 1:
          case 2:
            title = '請同意預訂單';
            text = '在對方同意您的預訂後您才能進行付款。';
            break;
          case 3:
            title = '待您修改預訂單';
            text = '在您修改後，對方才可同意。';
            break;
          case 4:
            title = '尚未付款';
            text = `請在${formatDate(this.props.startDate)}前完成付款，逾時將自動取消。`;
            break;
          case 5:
          case 6:
          case 7:
            title = '等待交易開始';
            text = `將在${formatDateForOrder(this.props.startDate)}開始`;
            break;
          case 8:
          case 9:
          case 10:
            title = '交易進行中';
            text = '';
            break;
          case 11:
            title = '已完成';
            text = '交易完成！請給對方評價吧！';
            break;
          case 12:
          case 13:
            title = '已評分';
            text = '您已完成評價，謝謝您使用ShareApp！';
            break;
          default:
            break;
        }

        return ({ title, text });
      }
  render() {
    const { type } = this.props;
    const isOrderType = type < 100;
    let objString = { title: '', text: '' };
    if (type < 100) {
      objString = this.generateString();
    }
    return (
      <div
        className={cx('banner_bkg', {
          'order-type': isOrderType,
          'sue-type': !isOrderType,
        })}
      >
        <div styleName="title_content">
          <div>
            <Icon styleName="icon" size={35} />
          </div>
          <div styleName="title">{ objString.title }</div>
        </div>
        <div styleName="body_content">
          <span>{ objString.text }</span>
        </div>
      </div>
    );
  }
}
export default CSS(Banner, styles);
