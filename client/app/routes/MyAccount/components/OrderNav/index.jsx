import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import accountNav from 'constants/myAccountNavs';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

export const ITEM = 0;
export const SERVICE = 1;
export const SPACE = 2;
export const USED_ITEM = 3;

const cx = classnames.bind(styles);
class OrderNav extends React.Component {
  static defaultProps = {
    isOwner: false,
  }

  static propTypes = {
    isOwner: PropTypes.bool,
    activeType: PropTypes.number.isRequired,
    unreadCount: PropTypes.shape({
      item: PropTypes.number,
      service: PropTypes.number,
      space: PropTypes.number,
      used_item: PropTypes.number,
    }).isRequired,
  };

  renderButtton(type) {
    const { activeType, unreadCount, isOwner } = this.props;
    const isActive = (activeType === type);
    let text = '';
    let redirecPath = '/';
    let colored = false;
    if (isOwner) {
      switch (type) {
        case ITEM:
          text = accountNav.ownerOrderItemPage.text;
          redirecPath = accountNav.ownerOrderItemPage.path;
          colored = (unreadCount.item > 0);
          break;
        case SERVICE:
          text = accountNav.ownerOrderServicePage.text;
          redirecPath = accountNav.ownerOrderServicePage.path;
          colored = (unreadCount.service > 0);
          break;
        case SPACE:
          text = accountNav.ownerOrderSpacePage.text;
          redirecPath = accountNav.ownerOrderSpacePage.path;
          colored = (unreadCount.space > 0);
          break;
        case USED_ITEM:
          text = accountNav.ownerOrderUsedItemPage.text;
          redirecPath = accountNav.ownerOrderUsedItemPage.path;
          colored = (unreadCount.used_item > 0);
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case ITEM:
          text = accountNav.lesseeOrderItemPage.text;
          redirecPath = accountNav.lesseeOrderItemPage.path;
          colored = (unreadCount.item > 0);
          break;
        case SERVICE:
          text = accountNav.lesseeOrderServicePage.text;
          redirecPath = accountNav.lesseeOrderServicePage.path;
          colored = (unreadCount.service > 0);
          break;
        case SPACE:
          text = accountNav.lesseeOrderSpacePage.text;
          redirecPath = accountNav.lesseeOrderSpacePage.path;
          colored = (unreadCount.space > 0);
          break;
        case USED_ITEM:
          text = accountNav.lesseeOrderUsedItemPage.text;
          redirecPath = accountNav.lesseeOrderUsedItemPage.path;
          colored = (unreadCount.used_item > 0);
          break;
        default:
          break;
      }
    }
    return (
      <div
        className={cx('linker', { selected: isActive })}
      >
        <Link
          to={redirecPath}
        >
          <div styleName="text">{text}</div>
          <div className={cx('count', { colored })} />
        </Link>
      </div>
    );
  }
  render() {
    // const { activeType } = this.props;
    return (
      <div styleName="container">
        {this.renderButtton(ITEM)}
        {this.renderButtton(SERVICE)}
        {this.renderButtton(SPACE)}
        {this.renderButtton(USED_ITEM)}
      </div>
    );
  }
}

export default CSS(OrderNav, styles);
