import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import flowStates from './constants/flowStates';
import actionTypes from './constants/actionTypes';


class VerifiedChange extends React.Component {

  static propTypes = {
    dataToChange: PropTypes.string.isRequired,

    saveToVerify: PropTypes.func.isRequired,

    rendererInit: PropTypes.func.isRequired,
    rendererEditing: PropTypes.func.isRequired,
    rendererVerifying: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      dataToChange: this.props.dataToChange,
      flow: flowStates.INIT,
      actionType:
        _.isEmpty(this.props.dataToChange) ?
        actionTypes.CREATE :
        actionTypes.UPDATE,
    };

    this.nextToEditing = this.nextToEditing.bind(this);
    this.nextToVerifying = this.nextToVerifying.bind(this);
    this.completeToInit = this.completeToInit.bind(this);

    this.changeData = this.changeData.bind(this);
  }

  nextToEditing() {
    this.setState({ flow: flowStates.EDITING });
  }

  nextToVerifying() {
    this.setState({ flow: flowStates.VERIFYING });
  }

  completeToInit() {
    this.setState({ flow: flowStates.INIT });
  }

  saveToVerify() {
    this.props.saveToVerify();
  }

  changeData(e) {
    this.setState({ dataToChange: e.target.value });
  }

  rendererInit() {
    return this.props.rendererInit(
      this.state.actionType,
      this.nextToEditing,
    );
  }

  rendererEditing() {
    // type, save, cancel
    return this.props.rendererEditing(
      this.state.actionType,
      this.nextToVerifying,
      this.changeData,
    );
  }

  rendererVerifying() {
    // type, complete, resend, cancel
    return this.props.rendererVerifying(
      this.state.actionType,
      this.completeToInit,
    );
  }

  render() {
    switch (this.state.flow) {
      case flowStates.INIT:
        return this.rendererInit();

      case flowStates.EDITING:
        return null;
      case flowStates.VERIFYING:
        return null;
      default:
        return null;
    }
  }
}

export default VerifiedChange;
