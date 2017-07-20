import { getPhoneVerifyCode, updatePhone } from 'actions/confirmUpdateActions';

export default class {
  constructor({ dispatch, onChange }) {
    this.props = { dispatch, onChange };

    this.getVerifyCode = this.getVerifyCode.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  getVerifyCode(newValue, password, { success, error }) {
    this.props.dispatch(
      getPhoneVerifyCode(
        newValue,
        password,
        { success, error },
      ),
    );
  }

  onConfirm(verifyCode, phone, { success, error }) {
    this.props.dispatch(
      updatePhone(
        verifyCode,
        {
          success() {
            success();
            this.props.onChange(phone);
          },
          error,
        },
      ),
    );
  }
}
