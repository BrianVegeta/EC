import React from 'react';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import InputTextWithError from '../../../components/InputTextWithError';
import constraints from './constraints';
import {
  updateContactName,
  updateContactPhone,
} from '../../../../../actions/publishActions';

class InputContact extends React.Component {
  static defaultProps = {
    disabled: false,
  };
  static propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.nameValidator = this.nameValidator.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.phoneValidator = this.phoneValidator.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.dispatch = props.dispatch;
  }
  onNameChange(value) {
    this.dispatch(updateContactName(value));
  }
  onPhoneChange(value) {
    this.dispatch(updateContactPhone(value));
  }
  validator(name) {
    return validate.single(this.props[name], constraints[name]);
  }
  nameValidator() {
    return this.validator('name');
  }
  phoneValidator() {
    return this.validator('phone');
  }
  valid() {
    this.nameInput.valid();
    this.phoneInput.valid();
  }
  render() {
    const { disabled } = this.props;
    const nameProps = {
      ref: input => (this.nameInput = input),
      validator: disabled ? null : this.nameValidator,
      onChange: this.onNameChange,
      placeholder: '真實姓名',
      value: this.props.name,
      disabled,
    };
    const phoneProps = {
      ref: input => (this.phoneInput = input),
      validator: disabled ? null : this.phoneValidator,
      onChange: this.onPhoneChange,
      placeholder: '電話號碼',
      value: this.props.phone,
      disabled,
    };
    return (
      <div styleName="container">
        <div styleName="name">
          <InputTextWithError {...nameProps} />
        </div>
        <div styleName="phone">
          <InputTextWithError {...phoneProps} />
        </div>
      </div>
    );
  }
}

export default CSS(InputContact, styles);
