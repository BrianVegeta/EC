import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-overlays';
import IconClose from 'react-icons/lib/md/close';
import styles from './styles.sass';

class ModalComponent extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onEntered: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    isShow: PropTypes.bool.isRequired,
    environment: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number, PropTypes.bool, PropTypes.string,
    ])).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = { dialogMaxH: 650 };
  }
  componentDidMount() {
    // TODO: to preload height
    // if (this.dialog) {
    //   this.setState({ dialogMaxH: this.dialog.clientHeight });
    // }
  }
  componentDidUpdate() {
    // if (this.dialog && this.state.dialogMaxH) {
    //   this.setState({ dialogMaxH: this.dialog.clientHeight });
    // }
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
        onHide={this.props.onClose}
        onShow={this.props.onEntered}
        show={this.props.isShow}
      >
        <div role="dialog" styleName="modal">
          <div role="dialog" styleName="dialog" {...dialogProps}>
            <div role="document" styleName="content" >
              {this.props.children}
            </div>
            <button
              onClick={this.props.onClose}
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
