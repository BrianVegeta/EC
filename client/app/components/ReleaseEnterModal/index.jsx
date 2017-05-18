import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import ReactModal from 'react-modal';
import GoodsIcon from 'react-icons/lib/md/work';
import ServiceIcon from 'react-icons/lib/md/people';
import SpaceIcon from 'react-icons/lib/md/home';
import styles from './styles.sass';

const ICON_SIZE = 50;
const ICON_COLOR = '#222';
class ReleaseEnterModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    ReactModal.setAppElement('[id^="App-react-component-"]');
  }
  render() {
    return (
      <ReactModal
        isOpen
        contentLabel="onRequestClose Example"
        onRequestClose={this.props.onClose}
        className={styles.Modal}
        overlayClassName={styles.Overlay}
      >
        <div className="container">
          <div styleName="entranceContainer">
            <div styleName="text">物品</div>
            <div styleName="entrance">
              <GoodsIcon size={ICON_SIZE} color={ICON_COLOR} />
            </div>
          </div>
          <div styleName="entranceContainer">
            <div styleName="text">服務</div>
            <div styleName="entrance">
              <ServiceIcon size={ICON_SIZE} color={ICON_COLOR} />
            </div>
          </div>
          <div styleName="entranceContainer">
            <div styleName="text">空間</div>
            <div styleName="entrance">
              <SpaceIcon size={ICON_SIZE} color={ICON_COLOR} />
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default CSS(ReleaseEnterModal, styles);
