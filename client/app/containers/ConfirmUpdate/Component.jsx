import React from 'react';
import PropTypes from 'prop-types';
import {
  isEmpty,
} from 'lodash';
import styled from 'styled-components';

import {
  TO_CREATE,
  TO_UPDATE,
  FLOW_INIT,
  FLOW_EDITING,
  FLOW_VERIFYING,
} from 'modules/confirmUpdate';

import PanelInit from './Panel/Init';
import PanelEdit from './Panel/Edit';
import PanelConfirm from './Panel/Confirm';
import PanelContainer from './Panel/Container';


const Container = styled.div`
`;

const initialState = {
  flow: FLOW_INIT,
  changeError: '',
  confirmError: '',
  inputError: '',
  loading: false,
};
class Controller extends React.Component {

  static defaultProps = {
    dispatchCheckPassword: null,
    password: null,
    value: null,
  };

  static propTypes = {
    valueType: PropTypes.oneOf(['phone', 'email']).isRequired,
    value: PropTypes.string,
    password: PropTypes.string,

    dispatchGetVerifyCode: PropTypes.func.isRequired,
    dispatchVerifyUpdate: PropTypes.func.isRequired,
    afterUpdateConfirm: PropTypes.func.isRequired,
    dispatchCheckPassword: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = Object.assign({}, initialState, {
      newValue: props.value,
      password: props.password,
    });

    this.switchToInit = this.switchToInit.bind(this);
    this.switchToEdit = this.switchToEdit.bind(this);

    this.getVerifyCode = this.getVerifyCode.bind(this);
    this.confirmUpdate = this.confirmUpdate.bind(this);
    this.resendVerifyCode = this.resendVerifyCode.bind(this);
  }

  getVerifyCode({ newValue, password }) {
    this.startLoading();
    this.props.dispatchGetVerifyCode(
      newValue, password,
    ).then(() => {
      this.switchToVerifying(newValue);
    }).catch(({ message }) => {
      this.setState({
        loading: false,
        changeError: message || 'Something goes wrong!',
      });
    });
  }

  confirmUpdate(verifyCode) {
    const {
      dispatchVerifyUpdate,
      afterUpdateConfirm,
    } = this.props;
    this.startLoading();

    dispatchVerifyUpdate(
      verifyCode,
    ).then(() => {
      const { newValue } = this.state;
      this.switchToInit(false);
      afterUpdateConfirm(newValue);
    }).catch(({ message }) => {
      this.setState({
        loading: false,
        changeError: message || 'Something goes wrong!',
      });
    });
  }

  startLoading() {
    this.setState({ loading: true });
  }

  switchToInit(resetValue = true) {
    const { value } = this.props;
    const newState = Object.assign({}, initialState,
      resetValue ? { newValue: value } : {},
    );
    this.setState(newState);
  }

  switchToVerifying(newValue) {
    const newState = Object.assign({}, initialState, {
      newValue,
      flow: FLOW_VERIFYING,
    });
    this.setState(newState);
  }

  switchToEdit() {
    const { value, dispatchCheckPassword } = this.props;
    if (dispatchCheckPassword) {
      dispatchCheckPassword().then((password) => {
        this.setState(Object.assign({}, initialState, {
          newValue: value,
          flow: FLOW_EDITING,
          password,
        }));
      });
      return;
    }
    this.setState(Object.assign({}, initialState, {
      newValue: value,
      flow: FLOW_EDITING,
    }));
  }

  resendVerifyCode() {
    this.getVerifyCode(this.state);
  }

  render() {
    const { valueType, value } = this.props;
    const actionType = isEmpty(value) ? TO_CREATE : TO_UPDATE;
    const {
      newValue,
      flow,
      loading,
      changeError,
      confirmError,
      inputError,
      password,
    } = this.state;

    const panelContainerProps = {
      valueType,
      isLoading: loading,
      changeError,
      confirmError,
      inputError,
      onCancel: this.switchToInit,
    };

    return (
      <Container>
        {{
          [FLOW_INIT]: (
            <PanelInit
              valueType={valueType}
              value={value}
              actionType={actionType}
              toEdit={this.switchToEdit}
            />
          ),
          [FLOW_EDITING]: (
            <PanelContainer {...panelContainerProps}>
              <PanelEdit
                valueType={valueType}
                actionType={actionType}
                getVerifyCode={inputValue => this.getVerifyCode({
                  newValue: inputValue,
                  password,
                })}
              />
            </PanelContainer>
          ),
          [FLOW_VERIFYING]: (
            <PanelContainer {...panelContainerProps}>
              <PanelConfirm
                newValue={newValue}
                onConfirm={this.confirmUpdate}
                onResend={() => this.getVerifyCode(this.state)}
                onCancel={this.switchToInit}
                setInputErrorMessage={message => this.setState({ inputError: message })}
              />
            </PanelContainer>
          ),
        }[flow]}
      </Container>
    );
  }
}

export default Controller;
