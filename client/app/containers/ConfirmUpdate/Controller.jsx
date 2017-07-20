import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

import * as flow from './constants/flowStates';
import { CREATE, UPDATE } from './constants/actionTypes';

import PanelInit from './Panel/Init';
import PanelEdit from './Panel/Edit';
import PanelConfirm from './Panel/Confirm';
import PanelContainer from './Panel/Container';


const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

class Controller extends React.Component {

  static propTypes = {
    valueType: PropTypes.oneOf(['phone', 'email']).isRequired,
    value: PropTypes.string.isRequired,

    getVerifyCode: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      newValue: this.props.value,
      flow: flow.INIT,
      hasTakenError: false,
      hasConfirmError: false,
      inputErrorMessage: null,
      loading: false,
    };

    this.toInit = this.toInit.bind(this);
    this.toEdit = this.toEdit.bind(this);
    this.toVerifying = this.toVerifying.bind(this);

    this.requestVerifyCode = this.requestVerifyCode.bind(this);
    this.confirmUpdate = this.confirmUpdate.bind(this);
    this.resendVerifyCode = this.resendVerifyCode.bind(this);

    // ERRORS
    this.setTakenError = this.setTakenError.bind(this);
    this.setConfirmError = this.setConfirmError.bind(this);
    this.setInputErrorMessage = this.setInputErrorMessage.bind(this);

    this.startLoading = this.startLoading.bind(this);
    this.stopLoading = this.stopLoading.bind(this);
  }

  setTakenError() {
    this.setState({ hasTakenError: true });
  }

  setConfirmError() {
    this.setState({ hasConfirmError: true });
  }

  setInputErrorMessage(inputErrorMessage) {
    this.setState({ inputErrorMessage });
  }

  getVerifyCode(newValue) {
    this.startLoading();
    this.props.getVerifyCode(
      newValue,
      'password',
      {
        success: () => {
          this.toVerifying(newValue);
          this.stopLoading();
        },
        error: () => {
          this.setTakenError();
          this.stopLoading();
        },
      },
    );
  }

  startLoading() {
    this.setState({ loading: true });
  }

  stopLoading() {
    this.setState({ loading: false });
  }

  toInit() {
    this.setState({
      flow: flow.INIT,
      newValue: this.props.value,
      hasConfirmError: false,
    });
  }

  toEdit() {
    this.setState({
      flow: flow.EDITING,
      newValue: this.props.value,
    });
  }

  toVerifying(newValue) {
    this.setState({
      flow: flow.VERIFYING,
      newValue,
      hasTakenError: false,
    });
  }

  requestVerifyCode(newValue) {
    this.getVerifyCode(newValue);
  }

  confirmUpdate(verifyCode) {
    this.startLoading();
    this.props.onConfirm(
      verifyCode,
      this.state.newValue,
      {
        success: () => {
          this.toInit();
          this.stopLoading();
        },
        error: () => {
          this.setConfirmError();
          this.stopLoading();
        },
      },
    );
  }

  resendVerifyCode() {
    const { newValue } = this.state;
    this.getVerifyCode(newValue);
  }

  render() {
    const { valueType, value } = this.props;
    const actionType = _.isEmpty(value) ? CREATE : UPDATE;
    const {
      newValue,
      loading,
      hasTakenError,
      hasConfirmError,
      inputErrorMessage,
    } = this.state;

    return (
      <Container>
        {{
          [flow.INIT]: (
            <PanelInit
              valueType={valueType}
              value={value}
              actionType={actionType}
              toEdit={this.toEdit}
            />
          ),
          [flow.EDITING]: (
            <PanelContainer
              valueType={valueType}
              isLoading={loading}
              onCancel={this.toInit}
              hasTakenError={hasTakenError}
            >
              <PanelEdit
                valueType={valueType}
                actionType={actionType}
                getVerifyCode={this.requestVerifyCode}
              />
            </PanelContainer>
          ),
          [flow.VERIFYING]: (
            <PanelContainer
              valueType={valueType}
              isLoading={loading}
              onCancel={this.toInit}
              hasConfirmError={hasConfirmError}
              inputErrorMessage={inputErrorMessage}
            >
              <PanelConfirm
                newValue={newValue}
                onConfirm={this.confirmUpdate}
                onResend={this.resendVerifyCode}
                onCancel={this.toInit}
                setInputErrorMessage={this.setInputErrorMessage}
              />
            </PanelContainer>
          ),
        }[this.state.flow]}
      </Container>
    );
  }
}

export default Controller;
