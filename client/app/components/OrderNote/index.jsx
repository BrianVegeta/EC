import React from 'react';
import PropTypes from 'prop-types';
import Picture from 'components/Picture';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class OrderNote extends React.Component {

  render() {
    return (
      <div styleName="ordernote-top-padding-style" className="clear">
        <div styleName="ordernote-pic-style">
          <Picture
            src={'https://shareapisd.s3.amazonaws.com/SACBK0VI_1502336264442.jpg'}
            width={100}
          />
        </div>
        <div styleName="ordernote-content-style">
          <div styleName="ordernote-date-style">04/05(三) - 04/07(五) 共3天</div>
          <div styleName="ordernote-text-style">存黑超近上作成失因藝一先與不了處全化多電axasfdjahadfasdfadhjfahsdjkfhdjkshkjsdkjfhdskj</div>
          <div styleName="ordernote-text-style">總計：NTD $21,000</div>
          <div styleName="ordernote-hint-style">訂單編號：CD000_01611_0003</div>
        </div>
      </div>
    );
  }
}

export default CSS(OrderNote, styles);
