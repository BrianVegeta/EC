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

  generateItemString() {
    let title = '';
    let text = '';
    switch (this.props.contractstage) {
      case 1:
        title = '請同意預訂單';
        text = `請在${formatDate(this.props.startDate)}出貨前同意預訂單，逾時將自動取消。`;
        break;
      case 2:
        title = '';
        text = '';
        break;
      case 3:
        title = '';
        text = '';
        break;
      case 4:
        title = '';
        text = '';
        break;
      case 5:
        title = '';
        text = '';
        break;
      case 6:
        title = '';
        text = '';
        break;
      case 7:
        title = '';
        text = '';
        break;
      case 8:
        title = '';
        text = '';
        break;
      case 9:
        title = '';
        text = '';
        break;
      case 10:
        title = '';
        text = '';
        break;
      case 11:
        title = '';
        text = '';
        break;
      case 12:
      case 13:
        title = '';
        text = '';
        break;
      default:
        break;
    }

    return ({ title, text });
  }

  generateServiceString() {
    let title = '';
    let text = '';
    switch (this.props.contractstage) {
      case 1:
        title = '請同意預訂單';
        text = `請在${formatDate(this.props.startDate)}出貨前同意預訂單，逾時將自動取消。`;
        break;
      case 2:
        title = '';
        text = '';
        break;
      case 3:
        title = '';
        text = '';
        break;
      case 4:
        title = '';
        text = '';
        break;
      case 5:
        title = '';
        text = '';
        break;
      case 6:
        title = '';
        text = '';
        break;
      case 7:
        title = '';
        text = '';
        break;
      case 8:
        title = '';
        text = '';
        break;
      case 9:
        title = '';
        text = '';
        break;
      case 10:
        title = '';
        text = '';
        break;
      case 11:
        title = '';
        text = '';
        break;
      case 12:
      case 13:
        title = '';
        text = '';
        break;
      default:
        break;
    }

    return ({ title, text });
  }

  generateSpaceString() {
    let title = '';
    let text = '';
    switch (this.props.contractstage) {
      case 1:
        title = '請同意預訂單';
        text = `請在${formatDate(this.props.startDate)}出貨前同意預訂單，逾時將自動取消。`;
        break;
      case 2:
        title = '';
        text = '';
        break;
      case 3:
        title = '';
        text = '';
        break;
      case 4:
        title = '';
        text = '';
        break;
      case 5:
        title = '';
        text = '';
        break;
      case 6:
        title = '';
        text = '';
        break;
      case 7:
        title = '';
        text = '';
        break;
      case 8:
        title = '';
        text = '';
        break;
      case 9:
        title = '';
        text = '';
        break;
      case 10:
        title = '';
        text = '';
        break;
      case 11:
        title = '';
        text = '';
        break;
      case 12:
      case 13:
        title = '';
        text = '';
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
