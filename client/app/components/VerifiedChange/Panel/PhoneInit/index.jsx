import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import { CREATE, UPDATE } from '../../constants/actionTypes';

class PhoneInit extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    toEdit: PropTypes.func.isRequired,
  };

  render() {
    switch (this.props.type) {
      case CREATE:
        return (
          <div styleName="container">
            <button
              styleName="createButton"
              onClick={this.props.toEdit}
            >
              ＋新增電話號碼
            </button>
          </div>
        );
      case UPDATE:
        return (
          <div styleName="container">
            <span styleName="label">手機：</span>
            <span>(+886) </span>0987123456
            <span styleName="verified">已驗證</span>
          </div>
        );
      default:
        return null;
    }
  }
}

export default CSS(PhoneInit, styles);
