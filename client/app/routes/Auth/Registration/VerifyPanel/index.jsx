import React from 'react';
import PropTypes from 'prop-types';
import IconVerified from 'react-icons/lib/md/verified-user';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import TextField from '../../../../components/TextField';
import FormButton from '../../../../components/FormButton';
import AlertPanel from '../../../../components/AlertPanel';


const cx = classnames.bind(styles);
class SignupPanel extends React.Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { model } = this.props;
    const {
      verifyCode,
    } = model;
    return (
      <div styleName="container">
        {model.verifyFailMessage &&
          <div styleName="alert">
            <AlertPanel message={model.verifyFailMessage} />
          </div>
        }
        <TextField
          icon={IconVerified}
          placeholder="請輸入驗證碼"
          resource={verifyCode}
        />
        <div styleName="identity">{model.login.value}</div>
        <div styleName="notice">
          <div>請輸入{model.isRegisterByEmail ? '信箱' : '簡訊'}內的驗證碼</div>
          <div>若您未收到{model.isRegisterByEmail ? '信箱' : '簡訊'}，請嘗試以下方式:</div>
        </div>
        <div className={cx('button')}>
          <FormButton
            content="重新傳送驗證碼"
            colorType="greenBorder"
            size="lg"
            style={{ width: '100%' }}
            onClick={() => console.log('resend')}
          />
        </div>
        <div className={cx('button', 'bottom')}>
          <FormButton
            content="驗證"
            size="lg"
            style={{ width: '100%' }}
            onClick={model.verify}
          />
        </div>
      </div>
    );
  }
}

export default CSS(SignupPanel, styles);
