import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import Modal from 'components/modals/Modal';

import * as popupTypes from 'constants/popupTypes';

import NewPasswordContainer from 'containers/PopupNewPasswordContainer';
import CheckPasswordContainer from 'containers/PopupCheckPasswordContainer';
import BankSetupContainer from 'containers/PopupBankSetupContainer';

import { closePopup } from 'actions/popupActions';

class ChangeProfileAndVerifyContainer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    popup: PropTypes.shape({
      isOpen: PropTypes.bool,
      renderType: PropTypes.string,
      width: PropTypes.number,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement('[id^="App-react-component-"]');
  }

  onClose() {
    this.props.dispatch(
      closePopup(),
    );
  }

  chooseModalContent() {
    const { renderType } = this.props.popup;

    switch (renderType) {
      case popupTypes.NEW_PASSWORD:
        return <NewPasswordContainer />;

      case popupTypes.CHECK_PASSWORD:
        return <CheckPasswordContainer />;

      case popupTypes.BANK_SETUP:
        return <BankSetupContainer />;

      default:
        return <NewPasswordContainer />;

    }
  }

  render() {

  }
}

const mapStateToProps = (state) => {
  return { };
};
export default connect(mapStateToProps)(ChangeProfileAndVerifyContainer);
