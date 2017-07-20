import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import IconClose from 'react-icons/lib/md/clear';
import LoadingOverlay from 'components/Loading/Overlay';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class PanelContainer extends React.Component {

  static defaultProps = {
    hasTakenError: false,
    hasConfirmError: false,
    inputErrorMessage: null,
  };

  static propTypes = {
    valueType: PropTypes.oneOf(['phone', 'email']).isRequired,
    children: myPropTypes.children.isRequired,
    onCancel: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasTakenError: PropTypes.bool,
    hasConfirmError: PropTypes.bool,
    inputErrorMessage: PropTypes.string,
  }

  render() {
    const {
      valueType,
      onCancel,
      isLoading,
      children,
      hasTakenError,
      hasConfirmError,
      inputErrorMessage,
    } = this.props;

    const label = {
      phone: '電話號碼',
      email: '電子信箱',
    }[valueType];

    return (
      <div styleName="container">
        {hasTakenError && <div styleName="error">{label}已被使用。</div>}
        {hasConfirmError && <div styleName="error">失敗，驗證碼錯誤。</div>}
        {inputErrorMessage && <div styleName="error">{inputErrorMessage}</div>}
        <div styleName="close">
          <IconClose size={25} onClick={onCancel} />
        </div>
        {children}
        {isLoading && <LoadingOverlay />}
      </div>
    );
  }
}

export default CSS(PanelContainer, styles);
