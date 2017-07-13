import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CloseIcon from 'react-icons/lib/md/close';
import InputPassword from 'components/Input/Password';
import FormButton from 'components/FormButton';

import { closePopup } from 'actions/popupActions';
import { checkPasswordAndNextBank } from 'actions/secrecyVerificationActions';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class PopupCheckPasswordContainer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      password: '',
      errorMessage: null,
    };
  }

  onClose() {
    this.props.dispatch(closePopup());
  }

  onChange(value) {
    this.setState({ password: value });
  }

  onSubmit() {
    const { dispatch } = this.props;
    const { password } = this.state;

    dispatch(checkPasswordAndNextBank(password));
  }

  render() {
    return (
      <div styleName="container">
        <div styleName="header">
          <span styleName="close">
            <CloseIcon
              size={25}
              onClick={this.onClose}
            />
          </span>
        </div>
        <div styleName="body">
          <div styleName="title">確認密碼</div>
          <div styleName="content">
            <div styleName="descript">
              存取個人隱私資料需要密碼驗證身份
            </div>
            <div styleName="input">
              <InputPassword
                value={this.state.password}
                placeholder="6個以上英數字"
                align="center"
                onChange={this.onChange}
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

const mapStateToProps = (state) => {
  const { schedule } = state;
  return { schedule };
};
export default connect(mapStateToProps)(CSS(PopupCheckPasswordContainer, styles));
