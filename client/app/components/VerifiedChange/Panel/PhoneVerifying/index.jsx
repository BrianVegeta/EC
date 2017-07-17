import React from 'react';
import PropTypes from 'prop-types';
import FormBlock from 'components/FormButton';
import InputText from 'components/Input/Text';
import constraints from 'constraints';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import { CREATE, UPDATE } from '../../constants/actionTypes';

class PhoneInit extends React.Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    verify: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  onChange(value) {
    this.setState({ value });
  }

  onClickNext() {
    if (this.input.valid()) {
      this.props.verify();
    }
  }

  render() {
    const { value } = this.state;
    const { type } = this.props;

    return (
      <div styleName="container">
        <InputText
          ref={input => (this.input = input)}
          value={value}
          placeholder={{
            [CREATE]: '新增您的電子信箱',
            [UPDATE]: '變更您的電子信箱',
          }[type]}
          onChange={this.onChange}
          constraints={constraints.email}
        />
        <div styleName="description">
          {{
            [CREATE]: '新增電子信箱之後，我們將會發送驗證碼至您的信箱，以驗證您的身份',
            [UPDATE]: '變更電子信箱之後，我們將會發送驗證碼至您的信箱，以驗證您的身份',
          }[type]}
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

export default CSS(PhoneInit, styles);
