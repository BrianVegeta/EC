import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Controller from './Controller';
import PhoneModel from './Model/Phone';

class ConfirmUpdatePhoneContainer extends React.Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { dispatch, onChange } = this.props;
    const model = new PhoneModel({ dispatch, onChange });
    return (
      <Controller
        valueType="phone"
        value={this.props.value}
        getVerifyCode={model.getVerifyCode}
        onConfirm={model.onConfirm}
      />
    );
  }
}

export default connect()(ConfirmUpdatePhoneContainer);
