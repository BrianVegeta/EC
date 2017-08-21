import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import IconClose from 'react-icons/lib/md/clear';
import LoadingOverlay from 'components/Loading/Overlay';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class PanelContainer extends React.Component {

  static defaultProps = {
    changeError: '',
    confirmError: '',
    inputError: '',
  };

  static propTypes = {
    valueType: PropTypes.oneOf(['phone', 'email']).isRequired,
    children: myPropTypes.children.isRequired,
    onCancel: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    changeError: PropTypes.string,
    confirmError: PropTypes.string,
    inputError: PropTypes.string,
  }

  render() {
    const {
      valueType,
      onCancel,
      isLoading,
      children,
      changeError,
      confirmError,
      inputError,
    } = this.props;

    const label = {
      phone: '電話號碼',
      email: '電子信箱',
    }[valueType];

    return (
      <div styleName="container">
        {changeError && <div styleName="error">{changeError}</div>}
        {confirmError && <div styleName="error">{confirmError}</div>}
        {inputError && <div styleName="error">{inputError}</div>}
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
