import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ReactModal from 'react-modal';
import ReactHoverObserver from 'react-hover-observer';
import CloseIcon from 'react-icons/lib/md/close';
import GoodsIcon from 'components/Icons/Publish/Goods';
import ServiceIcon from 'components/Icons/Publish/Service';
import SpaceIcon from 'components/Icons/Publish/Space';
import UsedGoodsIcon from 'components/Icons/Publish/UsedGoods';
import {
  publishGoodsRouter,
  publishServiceRouter,
  publishSpaceRouter,
  publishUsedGoodsRouter,
} from 'lib/paths';
import { generateRandomKey } from 'lib/utils';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const shortcuts = [
  [generateRandomKey(), '服務', publishServiceRouter.indexPath(), ServiceIcon],
  [generateRandomKey(), '空間', publishSpaceRouter.indexPath(), SpaceIcon],
  [generateRandomKey(), '物品', publishGoodsRouter.indexPath(), GoodsIcon],
  [generateRandomKey(), '二手', publishUsedGoodsRouter.indexPath(), UsedGoodsIcon],
];
const ICON_SIZE = 50;
const cx = classnames.bind(styles);
class ModalPublish extends React.Component {

  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      hoveringTarget: null,
    };
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick, false);
  }

  onOutsideClick(e) {
    if (!this.shortcutsContainer) return;
    if (this.shortcutsContainer.contains(e.target)) return;
    this.props.onClose();
  }

  onIconHover(isHovering, key) {
    this.setState({ hoveringTarget: isHovering ? key : null });
  }

  render() {
    const { hoveringTarget } = this.state;
    const { onClose } = this.props;
    const refShortcuts = shortcutsContainer =>
      (this.shortcutsContainer = shortcutsContainer);
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
          <div styleName="shortcuts" ref={refShortcuts} >
            {shortcuts.map(([key, text, path, Icon]) => (
              <div
                key={key}
                styleName="entry-container"
              >
                <div
                  className={cx('text', {
                    isHovering: hoveringTarget === key })
                  }
                >
                  {text}
                </div>
                <Link to={path} onClick={onClose}>
                  <ReactHoverObserver
                    className={cx('icon-container')}
                    onHoverChanged={
                      ({ isHovering }) => this.onIconHover(isHovering, key)
                    }
                  >
                    <Icon size={ICON_SIZE} />
                  </ReactHoverObserver>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default CSS(ModalPublish, styles);
