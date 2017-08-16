import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';

import CloseIcon from 'react-icons/lib/md/close';
import InputPassword from 'components/Input/Password';
import FormButton from 'components/FormButton';
import LoadingOverlay from 'components/Loading/Overlay';

import { closePopup } from 'modules/popup';
import {
  checkPasswordExist,
  resetState,
} from 'actions/accessCheckActions';

import { NEW, CHECK } from 'constants/renderTypes/accessCheck';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import AccessCheckModel from './Model';

class PopupAccessCheckContainer extends React.Component {

  static propTypes = {
    accessCheck: myPropTypes.accessCheck.isRequired,
    onChecked: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(
      checkPasswordExist(),
    );
  }

  componentWillUnmount() {
    this.props.dispatch(
      resetState(),
    );
  }

  onClose() {
    this.props.dispatch(closePopup());
  }

  render() {
    const {
      accessCheck,
      dispatch,
      onChecked,
    } = this.props;

    const accessCheckModel = new AccessCheckModel({
      accessCheck,
      onChecked,
      dispatch,
    });

    const {
      password,
      renderType,
      isChecking,
    } = accessCheck;

    if (isChecking) {
      return (
        <div styleName="container">
          <LoadingOverlay />
        </div>
      );
    }

    return (
      <div styleName="container">
        <div styleName="header">
          <span styleName="close">
            <CloseIcon size={25} onClick={this.onClose} />
          </span>
        </div>
        <div styleName="body">
          <div styleName="title">
            {{
              [NEW]: '設定密碼',
              [CHECK]: '確認密碼',
            }[renderType]}
          </div>
          <div styleName="content">
            <div styleName="descript">
              <div>存取個人隱私資料需要密碼驗證身份</div>
              {renderType === NEW && <div>您尚未設定密碼，請先設定。</div>}
            </div>
            <div styleName="input">
              <InputPassword
                value={password}
                placeholder="請輸入密碼"
                align="center"
                onChange={accessCheckModel.onPasswordChange}
                autoComplete="off"
              />
            </div>
          </div>
          <div styleName="submit">
            <FormButton
              width={170}
              colorType="green"
              content="送出"
              onClick={accessCheckModel.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { accessCheck } = state;
  return { accessCheck };
};
export default connect(mapStateToProps)(CSS(PopupAccessCheckContainer, styles));
