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
  RENDER_SUE_DETAIL,
  RENDER_LOGIN,
  RENDER_ATM,
  RENDER_SHOW_WISH,
  RENDER_REPORT,
  RENDER_SEVEN_NO,
  RENDER_SEVEN_LOG,
} from 'modules/popup';
import BankSetupContainer from 'containers/Popup/BankSetup/Container';
import AccessCheckContainer from 'containers/Popup/AccessCheck/Container';
import ScoreRatingContainer from 'containers/Popup/ScoreRating/Container';
import SueDetailContainter from 'containers/Popup/SueDetail/Container';
import LoginContainer from 'containers/Popup/Login/Container';
import ShowWishContainer from 'containers/Popup/ShowWish/Container';
import ATMBankContainer from 'containers/Popup/ATMBank/Container';
import ReportContainer from 'containers/Popup/Report/Container';
import SevenNoContainer from 'containers/Popup/Seven/Container';
import SevenLogContainer from 'containers/Popup/SevenLog/Container';

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
    const { dispatchCloseModal } = this.props;
    switch (renderType) {
      case RENDER_BANK_SETUP:
        return (
          <ModalBox width={600} onClose={dispatchCloseModal} >
            <BankSetupContainer password={options.password} />
          </ModalBox>
        );

      case RENDER_ACCESS_CHECK:
        return (
          <ModalBox width={500} onClose={dispatchCloseModal} >
            <AccessCheckContainer onChecked={options.onChecked} />
          </ModalBox>
        );

      case RENDER_SCORE_RATING:
        return (
          <ModalBox width={470} onClose={dispatchCloseModal} >
            <ScoreRatingContainer
              onScore={options.onScore}
              targetUrl={options.targetUrl}
              targetName={options.targetName}
              targetScore={options.targetScore}
              targetComment={options.targetComment}
              isView={options.isView}
            />
          </ModalBox>
        );

      case RENDER_PUBLISH_ENTRY: {
        return (
          <ModalPublish onClose={this.props.dispatchCloseModal} />
        );
      }

      case RENDER_SUE_DETAIL:
        return (
          <ModalBox width={470} onClose={dispatchCloseModal} >
            <SueDetailContainter
              options={options}
            />
          </ModalBox>
        );

      case RENDER_LOGIN:
        return (
          <ModalBox width={470} onClose={dispatchCloseModal} >
            <LoginContainer onAfterLogin={options.onAfterLogin} />
          </ModalBox>
        );

      case RENDER_SHOW_WISH:
        return (
          <ModalBox width={700} onClose={dispatchCloseModal} >
            <ShowWishContainer card={options.card} />
          </ModalBox>
        );

      case RENDER_ATM:
        return (
          <ModalBox
            width={470}
            onClose={this.props.dispatchCloseModal}
          >
            <ATMBankContainer
              options={options}
              dispatchClose={this.props.dispatchCloseModal}
            />
          </ModalBox>
        );

      case RENDER_REPORT:
        return (
          <ModalBox
            width={280}
            onClose={this.props.dispatchCloseModal}
          >
            <ReportContainer
              options={options}
            />
          </ModalBox>
        );
      case RENDER_SEVEN_NO:
        return (
          <ModalBox
            width={460}
            onClose={this.props.dispatchCloseModal}
          >
            <SevenNoContainer
              options={options}
              dispatchClose={this.props.dispatchCloseModal}
            />
          </ModalBox>
        );
      case RENDER_SEVEN_LOG:
        return (
          <ModalBox
            width={460}
            onClose={this.props.dispatchCloseModal}
          >
            <SevenLogContainer
              options={options}
              dispatchClose={this.props.dispatchCloseModal}
            />
          </ModalBox>
        );
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
