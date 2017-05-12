import React, { PropTypes } from 'react';
import { Modal } from 'react-overlays';
import IconClose from 'react-icons/lib/md/close';
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
    environment: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
      PropTypes.string,
    ])).isRequired,
  };
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      isModalOpen: this.props.isShow,
      dialogMaxH: null,
    };
  }
  componentDidMount() {
    // TODO: to preload height
    this.setState({ dialogMaxH: this.dialog.clientHeight });
  }
  closeModal() {
    // this.props.onClose();
    this.setState({ isModalOpen: false });
  }
  render() {
    const { environment } = this.props;
    const screenCurrentH = environment.height;
    const { dialogMaxH } = this.state;
    const isDialogContain = dialogMaxH < screenCurrentH;
    const styleDialog = {
      marginTop: isDialogContain ? -(dialogMaxH / 2) : 0,
      top: isDialogContain ? '50%' : 0,
    };
    const dialogProps = {
      ref: d => (this.dialog = d),
      style: styleDialog,
    };
    return (
      <Modal
        backdropClassName={styles.backdrop}
        show={this.state.isModalOpen}
        onHide={this.closeModal}
      >
        <div role="dialog" styleName="modal">
          <div role="dialog" styleName="dialog" {...dialogProps}>
            <div role="document" styleName="content" >
              {this.props.children}
            </div>
            <button
              onClick={this.closeModal}
              styleName="closeCross"
              className="button"
            >
              <IconClose size={40} />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ModalComponent;
