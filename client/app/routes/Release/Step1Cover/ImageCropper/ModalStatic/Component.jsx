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
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
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
    this.props.onClose();
    this.setState({ isModalOpen: false });
  }

  render() {
    const screenCurrentH = this.props.environment.height;
    const { dialogMaxH } = this.state;
    const isDialogContain = dialogMaxH < screenCurrentH;
    return (
      <Modal
        backdropClassName={styles.backdrop}
        show={this.state.isModalOpen}
        onHide={this.closeModal}
      >
        <div styleName="modal" role="dialog">
          <div
            ref={d => (this.dialog = d)}
            styleName="dialog"
            role="dialog"
            style={{
              marginTop: isDialogContain ? -(dialogMaxH / 2) : 0,
              top: isDialogContain ? '50%' : 0,
            }}
          >
            <div role="document" styleName="content">
              <div styleName="cropper">
                {this.props.children[0]}
              </div>
              <div styleName="controller">
                {this.props.children[1]}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ModalComponent;
