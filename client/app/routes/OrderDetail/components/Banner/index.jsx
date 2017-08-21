import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons/lib/fa/adjust';
import CSS from 'react-css-modules';

import { generateOwnerItemString, generateOwnerServiceString,
  generateOwnerSpaceString, generateLesseeItemString,
  generateLesseeServiceString, generateLesseeSpaceString }
  from 'lib/contractString'
import styles from './styles.sass';

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
    const objString = this.generateString();
    return (
      <div styleName="order_banner_bkg" className="clear">
        <div styleName="order_banner_title_content">
          <div>
            <Icon styleName="order_banner_icon" size={35} />
          </div>
          <div styleName="order_banner_title">{ objString.title }</div>
        </div>
        <div styleName="order_banner_body_content">
          <span>{ objString.text }</span>
        </div>
      </div>
    );
  }
}
export default CSS(Banner, styles);
