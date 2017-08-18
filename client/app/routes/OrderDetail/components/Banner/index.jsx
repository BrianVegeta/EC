import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons/lib/fa/adjust';
import CSS from 'react-css-modules';

import classnames from 'classnames/bind';
import { generateOwnerItemString, generateOwnerServiceString,
  generateOwnerSpaceString, generateLesseeItemString,
  generateLesseeServiceString, generateLesseeSpaceString }
  from 'lib/contractString'
import styles from './styles.sass';

const cx = classnames.bind(styles);
class Banner extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    contractstage: PropTypes.number.isRequired,
    startDate: PropTypes.number.isRequired,
    isOwner: PropTypes.bool.isRequired,
  };

  generateString() {
    const { isOwner, type, contractstage, startDate } = this.props;
    if (isOwner) {
      switch (type) {
        case 'ITEM':
          return generateOwnerItemString(contractstage, startDate);
        case 'SERVICE':
          return generateOwnerServiceString(contractstage, startDate);
        case 'SPACE':
          return generateOwnerSpaceString(contractstage, startDate);
        default:
          return ({ title: '', text: '' });
      }
    } else {
      switch (this.props.type) {
        case 'ITEM':
          return generateLesseeItemString(contractstage, startDate);
        case 'SERVICE':
          return generateLesseeServiceString(contractstage, startDate);
        case 'SPACE':
          return generateLesseeSpaceString(contractstage, startDate);
        default:
          return ({ title: '', text: '' });
      }
    }
  }

  render() {
    const { contractstage } = this.props;
    const regularContract = (contractstage < 1000);
    let objString = { title: '', text: '' };
    if (regularContract) {
      objString = this.generateString();
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
    return (
      <div
        className={cx('banner_bkg', {
          'order-type': regularContract,
          'sue-type': !regularContract,
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
