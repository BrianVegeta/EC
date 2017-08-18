import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import CloseIcon from 'react-icons/lib/md/close';
import InputPassword from 'components/Input/Password';
import FormButton from 'components/FormButton';
import LoadingOverlay from 'components/Loading/Overlay';
import { NEW, CHECK } from 'modules/access';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class PopupAcessCheck extends React.Component {

  static propTypes = {
    access: myPropTypes.accessCheck.isRequired,
    onChecked: PropTypes.func.isRequired,

    dispatchCheckPasswordExist: PropTypes.func.isRequired,
    dispatchResetAccess: PropTypes.func.isRequired,
    dispatchChangePassword: PropTypes.func.isRequired,
    dispatchCreatePassword: PropTypes.func.isRequired,
    dispatchCheckPassword: PropTypes.func.isRequired,
    dispatchClosePopup: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const { dispatchCheckPasswordExist } = this.props;
    dispatchCheckPasswordExist();
  }

  componentWillUnmount() {
    const { dispatchResetAccess } = this.props;
    dispatchResetAccess();
  }

  onSubmit() {
    const {
      access,
      dispatchCreatePassword,
      dispatchCheckPassword,
      onChecked,
    } = this.props;

    const {
      renderType,
      password,
    } = access;

    switch (renderType) {
      case NEW:
        dispatchCreatePassword(password, onChecked);
        return;

      case CHECK:
        dispatchCheckPassword(password, onChecked);
        return;

      default:
        throw new Error(`RENDER TYPE NOT IN [${NEW}, ${CHECK}]`);
    }
  }

  render() {
    const {
      access,
      dispatchClosePopup,
      dispatchChangePassword,
    } = this.props;

    // const accessCheckModel = new AccessCheckModel({
    //   access,
    //   onChecked,
    //   dispatch,
    // });

    const {
      password,
      renderType,
      isChecking,
    } = access;

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
            <CloseIcon size={25} onClick={dispatchClosePopup} />
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
                onChange={value => dispatchChangePassword({ password: value })}
                autoComplete="off"
              />
            </div>
          </div>
          <div styleName="submit">
            <FormButton
              width={170}
              colorType="green"
              content="送出"
              onClick={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default CSS(PopupAcessCheck, styles);
