import { getEmailVerifyCode, updateEmail } from 'actions/confirmUpdateActions';

export default class {
  constructor({ dispatch, onChange }) {
    this.props = { dispatch, onChange };

    this.getVerifyCode = this.getVerifyCode.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  getVerifyCode(newValue, password, { success, error }) {
    this.props.dispatch(
      getEmailVerifyCode(
        newValue,
        password,
        { success, error },
      ),
    );
  }

  onConfirm(verifyCode, email, { success, error }) {
    this.props.dispatch(
      updateEmail(
        verifyCode,
        {
          success() {
            success();
            this.props.onChange(email);
          },
          error,
        },
      ),
    );
  }
}
