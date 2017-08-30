import React from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
// import myPropTypes from 'propTypes';

import { FACEBOOK_APP_ID } from 'constants/config';
import TableForm, { TableRow } from 'components/TableForm';
import ConfirmUpdatePhoneContainer from 'containers/ConfirmUpdate/PhoneContainer';
import ConfirmUpdateEmailContainer from 'containers/ConfirmUpdate/EmailContainer';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class Profile extends React.Component {

  static propTypes = {
    manage: PropTypes.shape({
      data: PropTypes.shape({
        email: PropTypes.string,
        phone: PropTypes.string,
        fb_id: PropTypes.string,
      }).isRequired,
    }).isRequired,

    dispatchChangeData: PropTypes.func.isRequired,
    dispatchFetchUserData: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatchConnectFB: PropTypes.func.isRequired,
  };

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.dispatchReset();
    this.props.dispatchFetchUserData();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const {
      dispatchChangeData,
      dispatchConnectFB,
      manage: {
        data: {
          email,
          phone,
          fb_id,
        },
      },
    } = this.props;

    return (
      <TableForm>
        <TableRow labelWidth={100} labelVerticalAlign="top">
          <span styleName="label">手機號碼</span>
          <div styleName="input-container">
            <ConfirmUpdatePhoneContainer
              value={phone}
              afterUpdateConfirm={value => dispatchChangeData({ phone: value })}
            />
            <div styleName="notice">
              您與另一位用戶確認預訂後，才會顯示您的號碼，用以聯絡彼此。
            </div>
          </div>
        </TableRow>
        <TableRow labelVerticalAlign="top">
          <span styleName="label">電子信箱</span>
          <div styleName="input-container">
            <ConfirmUpdateEmailContainer
              value={email}
              afterUpdateConfirm={value => dispatchChangeData({ email: value })}
            />
            <div styleName="notice">
              我們不會向其他用戶透露您個人的電子郵件地址，系統僅會在交易時寄送重要通知給您。
            </div>
          </div>
        </TableRow>
        <TableRow>
          <span styleName="label">Facebook</span>
          <div styleName="input-container">
            <FacebookLogin
              appId={FACEBOOK_APP_ID}
              textButton="連結"
              cssClass={`button ${cx('fb-connect')}`}
              fields="name,email,picture"
              callback={dispatchConnectFB}
            />
            <button className="button" styleName="fb-connect">連結</button>
          </div>
        </TableRow>
      </TableForm>
    );
  }
}

export default CSS(Profile, styles);
