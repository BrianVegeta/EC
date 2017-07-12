import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import Modal from 'components/modals/Modal';

class ModalContainer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    modal: PropTypes.shape({
      data: PropTypes.object,
      component: PropTypes.func,
      isOpen: PropTypes.bool,
    }).isRequired
  };

  componentDidMount() {
    ReactModal.setAppElement('[id^="App-react-component-"]');
  }

  render() {
    const { modal } = this.props;
    const { Component, data, isOpen } = modal;

    if (Component) {
      return (
        <Modal >
          <Component />
        </Modal>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  const { modal } = state;
  return { modal };
};
export default connect(mapStateToProps)(ModalContainer);
