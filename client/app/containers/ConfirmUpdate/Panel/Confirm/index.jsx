import React from 'react';
import PropTypes from 'prop-types';
import FormBlock from 'components/FormButton';
import InputText from 'components/Input/Text';
import constraints from 'constraints';

import _ from 'lodash';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class Confirm extends React.Component {

  static propTypes = {
    newValue: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onResend: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    setInputErrorMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      verifyCode: '',
      count: 30,
    };

    this.onConfirm = this.onConfirm.bind(this);
    this.onResend = this.onResend.bind(this);
    this.onVerifyCodeChange = this.onVerifyCodeChange.bind(this);
  }

  componentDidMount() {
    this.setCounter();
  }

  componentWillUnmount() {
    this.destroyCounter();
  }

  onVerifyCodeChange(verifyCode) {
    this.setState({ verifyCode });
  }

  onConfirm() {
    const errors = this.input.validator();
    this.props.setInputErrorMessage(errors ? errors[0] : null);

    const { verifyCode } = this.state;
    if (this.input.valid()) {
      this.props.onConfirm(verifyCode);
    }
  }

  onResend() {
    this.props.onResend();
    this.setCounter();
  }

  setCounter() {
    this.setState({ count: 30 });
    this.counter = setInterval(() => {
      const { count } = this.state;
      this.setState({ count: count - 1 });
      if (this.state.count === 0) this.destroyCounter();
    }, 1000);
  }

  destroyCounter() {
    clearInterval(this.counter);
  }

  render() {
    const { newValue } = this.props;
    const { count } = this.state;
    return (
      <div>
        <div styleName="description">
          <span>已發送驗證碼至</span>
          <span styleName="verify-data">
            {_.truncate(newValue, { length: 18 })}
          </span>
          <div styleName="resend-container">
            <FormBlock
              style={{ padding: '12px 15px' }}
              content={count > 0 ? `重發 ${count}s` : '重發驗證碼'}
              onClick={this.onResend}
              disabled={count > 0}
            />
          </div>
        </div>
        <div styleName="input-label">
          請輸入4位數的驗證碼：
          <div styleName="input">
            <InputText
              ref={input => (this.input = input)}
              placeholder=""
              value={this.state.verifyCode}
              onChange={this.onVerifyCodeChange}
              constraints={constraints.verifyCode}
              disableBlurValid
              disableErrorTooltip
            />
          </div>
        </div>
        <div styleName="controller" className="clear">
          <div styleName="verify">
            <FormBlock
              width="auto"
              content="驗證"
              onClick={this.onConfirm}
            />
          </div>
          <div styleName="cancel">
            <FormBlock
              width="auto"
              style={{ padding: 12 }}
              colorType="dangerBlank"
              content="取消"
              onClick={this.props.onCancel}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(Confirm, styles);
