import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactModal from 'react-modal';
import ReactHoverObserver from 'react-hover-observer';
import CloseIcon from 'react-icons/lib/md/close';

import GoodsIcon from 'components/Icons/Publish/Goods';
import ServiceIcon from 'components/Icons/Publish/Service';
import SpaceIcon from 'components/Icons/Publish/Space';
import { publishGoodsRouter, publishServiceRouter, publishSpaceRouter,
 } from 'lib/paths';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const ICON_SIZE = 50;
const cx = classnames.bind(styles);
class ModalPublish extends React.Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onHoverChange = this.onHoverChange.bind(this);
    this.state = {
      isHovering: false,
    };
  }

  onHoverChange({ isHovering }) {
    this.setState({ isHovering });
  }

  render() {
    const servicePath = publishServiceRouter.indexPath();
    const spacePath = publishSpaceRouter.indexPath();
    const goodsPath = publishGoodsRouter.indexPath();

    const shortcuts = [
      { text: '服務', path: servicePath, Icon: ServiceIcon },
      { text: '空間', path: spacePath, Icon: SpaceIcon },
      { text: '物品', path: goodsPath, Icon: GoodsIcon },
    ];

    const { isHovering } = this.state;
    const { onClose } = this.props;
    return (
      <ReactModal
        isOpen
        contentLabel="POPUP PUBLISH MODAL"
        onRequestClose={onClose}
        className={cx('modal')}
        overlayClassName={cx('overlay')}
      >
        <div className="container no-bg">
          <div styleName="control">
            <button className="button" onClick={onClose}>
              <CloseIcon size={30} />
            </button>
          </div>
          {shortcuts.map((shortcut, i) => (
            <div key={`${i + 1}`} styleName="entry-container">
              <div className={cx('text', { hovering: isHovering })}>
                {shortcut.text}
              </div>
              <Link to={shortcut.path} onClick={onClose}>
                <ReactHoverObserver
                  className={cx('icon-container')}
                  onHoverChang={this.onHoverChange}
                >
                  <shortcut.Icon size={ICON_SIZE} />
                </ReactHoverObserver>
              </Link>
            </div>
          ))}
        </div>
      </ReactModal>
    );
  }
}

export default CSS(ModalPublish, styles);
