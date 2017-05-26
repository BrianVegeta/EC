import React, { PropTypes } from 'react';
import ErrorIcon from 'react-icons/lib/md/error';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Alert extends React.Component {
  render() {
    return (
      <div styleName="alert" >
        <div styleName="alertInner">
          <div styleName="alertIcon">
            <ErrorIcon size={25} color="#e6a896" />
          </div>
          <div styleName="alertText">
            重複的折扣組合
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(Alert, styles);
