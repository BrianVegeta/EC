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
} from 'modules/popup';
import BankSetupContainer from 'containers/Popup/BankSetup/Container';
import AccessCheckContainer from 'containers/Popup/AccessCheck/Container';
import ScoreRatingContainer from 'containers/Popup/ScoreRating/Container';
import SueDetailContainter from 'containers/Popup/SueDetail/Container';

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
            <BankSetupContainer password={options.password} />
          </ModalBox>
        );

      case RENDER_ACCESS_CHECK:
        return (
          <ModalBox
            width={500}
            onClose={this.props.dispatchCloseModal}
          >
            <AccessCheckContainer onChecked={options.onChecked} />
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
          <ModalBox
            width={470}
            onClose={this.props.dispatchCloseModal}
          >
            <SueDetailContainter
              cid={options.cid}
              u_no={options.u_no}
              suer_name={options.suer_name}
              defender_name={options.defender_name}
              img1={options.img1}
              img2={options.img2}
              img3={options.img3}
              sue_reason={options.sue_reason}
              status={options.status}
              case_end={options.case_end}
              create_time={options.create_time}
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
