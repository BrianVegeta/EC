import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import ModalBox from 'components/Modal/Box';
import ModalPublish from 'components/Modal/Publish';
import {
  RENDER_ACCESS_CHECK,
  RENDER_BANK_SETUP,
  RENDER_PUBLISH_ENTRY,
  RENDER_SCORE_RATING,
} from 'modules/popup';
import BankSetupContainer from 'containers/Popup/BankSetupContainer';
import AccessCheckContainer from 'containers/Popup/AccessCheckContainer';
import ScoreRatingContainer from 'containers/Popup/ScoreRating/Container';


class Popup extends React.Component {

  static propTypes = {
    dispatchCloseModal: PropTypes.func.isRequired,
    popup: PropTypes.shape({
      isOpen: PropTypes.bool,
      renderType: PropTypes.string,
      options: PropTypes.object,
    }).isRequired,
  };

  componentDidMount() {
    ReactModal.setAppElement('[id^="App-react-component-"]');
  }

  renderModal({ renderType, options }) {
    switch (renderType) {
      case RENDER_BANK_SETUP:
        return (
          <ModalBox
            width={600}
            onClose={this.props.dispatchCloseModal}
          >
            <BankSetupContainer />
          </ModalBox>
        );

      case RENDER_ACCESS_CHECK:
        return (
          <ModalBox
            width={500}
            onClose={this.props.dispatchCloseModal}
          >
            <AccessCheckContainer
              onChecked={options.onChecked}
            />;
          </ModalBox>
        );

      case RENDER_SCORE_RATING:
        return (
          <ModalBox
            width={470}
            onClose={this.props.dispatchCloseModal}
          >
            <ScoreRatingContainer
              onScore={options.onScore}
            />
          </ModalBox>
        );

      case RENDER_PUBLISH_ENTRY: {
        return (
          <ModalPublish onClose={this.props.dispatchCloseModal} />
        );
      }

      default:
        return null;

    }
  }

  render() {
    const { popup } = this.props;
    const { isOpen, renderType } = popup;
    if (!renderType || !isOpen) return null;

    return this.renderModal(popup);
  }
}

export default Popup;
