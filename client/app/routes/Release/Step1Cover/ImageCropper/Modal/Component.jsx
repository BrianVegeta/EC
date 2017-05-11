import React, { PropTypes } from 'react';
import { Modal } from 'react-overlays';
import styles from './styles.sass';

const CONTENT_PADDING = 20;
class ModalComponent extends React.Component {

  static mathMiddle(v1, v2, v3) {
    const max = Math.max(v1, v2, v3);
    const min = Math.min(v1, v2, v3);
    return ((v1 + v2) + v3) - (max + min);
  }

  static defaultProps = {
    onClose: null,
    isShow: true,
  };

  static propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    isShow: PropTypes.bool.isRequired,
    environment: PropTypes.objectOf(PropTypes.oneOfType(
      PropTypes.number,
      PropTypes.bool,
      PropTypes.string,
    )).isRequired,
  };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      isModalOpen: this.props.isShow,
      dimensions: {
        dialogMaxH: null,
        ctrlStaticW: null,
        ctrlStaticH: null,
      },
    };
  }

  componentDidMount() {
    // TODO: to preload height
    this.setState({
      dimensions: {
        dialogMaxH: this.dialog.clientHeight,
        ctrlStaticW: this.controller.offsetWidth,
        ctrlStaticH: this.controller.offsetHeight,
      },
    });
  }

  closeModal() {
    this.props.onClose();
    this.setState({ isModalOpen: false });
  }

  presentDimes() {
    const { dialogMaxH, ctrlStaticW, ctrlStaticH } = this.state.dimensions;
    return dialogMaxH && ctrlStaticW && ctrlStaticH;
  }

  render() {
    const screenCurrentH = this.props.environment.height;

    const { dimensions } = this.state;
    const { dialogMaxH, ctrlStaticW, ctrlStaticH } = dimensions;
    const dialogMinH = (ctrlStaticW + (CONTENT_PADDING * 2)) + ctrlStaticH;
    const dialogWidth = this.presentDimes() &&
      this.constructor.mathMiddle(dialogMinH, screenCurrentH, dialogMaxH);
    const cropperH = dialogWidth && (dialogWidth - (CONTENT_PADDING * 2)) - ctrlStaticH;
    const styleDialog = {
      top: (dialogWidth === dialogMaxH ? '50%' : 0),
      marginTop: (dialogWidth === dialogMaxH ? -(dialogMaxH / 2) : 0),
      width: dialogWidth,
    };
    const styleContent = {
      padding: CONTENT_PADDING,
      height: dialogWidth,
    };
    const styleCropper = {
      height: cropperH,
      width: cropperH,
    };
    return (
      <Modal
        backdropClassName={styles.backdrop}
        show={this.state.isModalOpen}
        onHide={this.closeModal}
      >
        <div
          styleName="modal"
          role="dialog"
        >
          <div
            styleName="dialog"
            role="dialog"
            ref={d => (this.dialog = d)}
            style={styleDialog}
          >
            <div
              role="document"
              styleName="content"
              style={styleContent}
            >
              <div
                styleName="cropper"
                style={styleCropper}
              >
                {this.props.children[0]}
              </div>
              <div
                styleName="controller"
                ref={c => (this.controller = c)}
              >
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
