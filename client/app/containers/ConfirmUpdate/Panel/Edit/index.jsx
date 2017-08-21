import React from 'react';
import PropTypes from 'prop-types';

import FormBlock from 'components/FormButton';
import InputText from 'components/Input/Text';
import { TO_CREATE, TO_UPDATE } from 'modules/VerifyUpdate';
import constraints from 'constraints';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class PanelEdit extends React.Component {

  static propTypes = {
    valueType: PropTypes.oneOf(['phone', 'email']).isRequired,
    actionType: PropTypes.string.isRequired,
    getVerifyCode: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  onChange(value) {
    this.setState({ inputValue: value });
  }

  onClickNext() {
    if (this.input.valid()) {
      this.props.getVerifyCode(this.state.inputValue);
    }
  }

  render() {
    const { inputValue } = this.state;
    const { actionType, valueType } = this.props;

    const label = {
      phone: '電話',
      email: '電子信箱',
    }[valueType];

    const action = {
      [TO_CREATE]: '新增',
      [TO_UPDATE]: '變更',
    }[actionType];

    return (
      <div>
        <InputText
          ref={input => (this.input = input)}
          value={inputValue}
          placeholder={`${action}您的${label}`}
          onChange={this.onChange}
          constraints={{
            phone: constraints.phone,
            email: constraints.email,
          }[valueType]}
        />
        <div styleName="description">
          {action}{label}之後，我們將會發送驗證碼至您的{label}，以驗證您的身份
        </div>
        <FormBlock
          width="auto"
          content="下一步"
          onClick={this.onClickNext}
        />
      </div>
    );
  }
}

export default CSS(PanelEdit, styles);
