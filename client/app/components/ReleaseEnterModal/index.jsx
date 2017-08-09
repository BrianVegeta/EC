import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactModal from 'react-modal';
import GoodsIcon from 'react-icons/lib/md/work';
import ServiceIcon from 'react-icons/lib/md/people';
import SpaceIcon from 'react-icons/lib/md/home';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import { ICONS } from '../../constants';

class ReleaseEnterModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    ReactModal.setAppElement('[id^="App-react-component-"]');
  }
  render() {
    const size = ICONS.RELEASE_ENTRANCE_SIZE;
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
            <Link to="/p/release-goods">
              <div styleName="entrance">
                <GoodsIcon size={size} />
              </div>
            </Link>
          </div>
          <div styleName="entranceContainer">
            <div styleName="text">服務</div>
            <div styleName="entrance">
              <ServiceIcon size={size} />
            </div>
          </div>
          <div styleName="entranceContainer">
            <div styleName="text">空間</div>
            <div styleName="entrance">
              <SpaceIcon size={size} />
            </div>
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default CSS(ReleaseEnterModal, styles);
