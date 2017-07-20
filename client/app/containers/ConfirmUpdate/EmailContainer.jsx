import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Controller from './Controller';
import EmailModel from './Model/Email';

class ConfirmUpdateEmailContainer extends React.Component {

  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { dispatch, onChange } = this.props;
    const model = new EmailModel({ dispatch, onChange });

    return (
      <Controller
        valueType="email"
        value={this.props.value}
        getVerifyCode={model.getVerifyCode}
        onConfirm={model.onConfirm}
      />
    );
  }
}

export default connect()(ConfirmUpdateEmailContainer);
