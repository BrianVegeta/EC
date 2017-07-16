import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as flowStates from './constants/flowStates';
import * as actionTypes from './constants/actionTypes';


class FlowController extends React.Component {

  static propTypes = {
    value: PropTypes.string.isRequired,

    onVerify: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,

    renderInit: PropTypes.func.isRequired,
    renderEditing: PropTypes.func.isRequired,
    renderVerifying: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      unstagedValue: value,
      flow: flowStates.INIT,
      actionType: _.isEmpty(value) ? actionTypes.CREATE : actionTypes.UPDATE,
    };


    this.onToEditing = this.onToEditing.bind(this);
    this.onToVerifying = this.onToVerifying.bind(this);

    this.onComplete = this.onComplete.bind(this);
    this.onVerify = this.onVerify.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onToEditing() {
    this.setState({ flow: flowStates.EDITING });
  }

  onToVerifying() {
    this.setState({ flow: flowStates.VERIFYING });
  }

  onComplete() {
    this.props.onSave();
    this.setState({ flow: flowStates.INIT });
  }

  onCancel() {
    this.setState({ flow: flowStates.INIT });
  }

  onVerify() {
    this.props.onVerify();
    this.setState({ flow: flowStates.VERIFYING });
  }

  onValueChange(value) {
    this.setState({ value });
  }

  render() {
    const { actionType } = this.state;

    switch (this.state.flow) {
      case flowStates.INIT:
        // type, to edit
        return this.props.renderInit(
          actionType,
          this.onToEditing,
        );

      case flowStates.EDITING:
        // type, verify, cancel
        return this.props.renderEditing(
          actionType,
          this.onVerify,
          this.onCancel,
        );

      case flowStates.VERIFYING:
        // type, complete, resend, cancel
        return this.props.renderVerifying(
          actionType,
          this.onComplete,
        );

      default:
        return null;
    }
  }
}

export default FlowController;
