import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import Modal from 'components/modals/Modal';

import * as popupTypes from 'constants/popupTypes';

import BankSetupContainer from 'containers/Popup/BankSetupContainer';
import AccessCheckContainer from 'containers/Popup/AccessCheckContainer';

import { closePopup } from 'actions/popupActions';

class PopupContainer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    popup: PropTypes.shape({
      isOpen: PropTypes.bool,
      renderType: PropTypes.string,
      width: PropTypes.number,
      options: PropTypes.object,
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
    const { renderType, options } = this.props.popup;

    switch (renderType) {
      case popupTypes.BANK_SETUP:
        return <BankSetupContainer />;

      case popupTypes.ACCESS_CHECK:
        return <AccessCheckContainer onChecked={options.onChecked} />;

      default:
        return null;

    }
  }

  render() {
    const { isOpen, renderType, width } = this.props.popup;

    if (renderType && isOpen) {
      return (
        <Modal
          width={width}
          onClose={this.onClose}
        >
          {this.chooseModalContent()}
        </Modal>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  const { popup } = state;
  return { popup };
};
export default connect(mapStateToProps)(PopupContainer);
