import React, { PropTypes } from 'react';
import { Modal } from 'react-overlays';
import styles from './styles.sass';

class ModalComponent extends React.Component {

  static defaultProps = {
    onClose: null,
    isShow: true,
  };

  static propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
    isShow: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      isModalOpen: this.props.isShow,
      dialogHeight: null,
    };
  }

  componentDidMount() {
    // TODO: to preload height
    this.setState({ dialogHeight: this.dialog.clientHeight });
  }

  closeModal() {
    this.props.onClose();
    this.setState({ isModalOpen: false });
  }

  render() {
    const { dialogHeight } = this.state;
    const dialogStyle = dialogHeight && { top: '50%', marginTop: -(dialogHeight / 2) };
    return (
      <Modal
        backdropClassName={styles.backdrop}
        show={this.state.isModalOpen}
        onHide={this.closeModal}
      >
        <div role="dialog" styleName="modal" >
          <div
            role="dialog"
            styleName="dialog"
            ref={d => (this.dialog = d)}
            style={dialogStyle}
          >
            <div role="document" styleName="content">
              {this.props.children}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ModalComponent;
