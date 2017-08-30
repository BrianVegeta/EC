import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import myPropTypes from 'propTypes';
import Avatar from 'components/Avatar';
import { my as mineRouter } from 'lib/paths';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
const navs = [
  ['分享/發佈', mineRouter.myGoodsPath],
  ['廠商訂單', mineRouter.ownerOrderItem('TAB_REQUEST')],
  ['行事曆', mineRouter.calendarPath],
  ['消費狀態', mineRouter.lesseeOrderItem('TAB_REQUEST')],
  ['許願紙條', mineRouter.wishPath],
  ['優惠券', mineRouter.couponPath],
  ['收藏', mineRouter.collectionPath],
  ['我的錢包', mineRouter.walletPath],
  ['評價', mineRouter.commentOwnerPath],
  ['公開資訊', mineRouter.profilePath],
  ['帳號管理', mineRouter.manageVerifyPath],
  ['收款設定', ''],
];


class MyAccountSidebar extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
    user: PropTypes.shape({
      picture: PropTypes.string,
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { children, user: { picture, name } } = this.props;
    return (
      <div styleName="container" className="clear">
        <div styleName="sidebar">
          <div styleName="profile">
            <div styleName="avatar">
              <Avatar width={100} src={picture} />
            </div>
            <div styleName="username">{name}</div>
          </div>
          <ul styleName="navsList" className="default-ul">
            {navs.map(([text, path], index) => (
              <li key={`${index + 1}`} styleName="listItem">
                <Link
                  to={path}
                  styleName="itemLink"
                  activeClassName={cx('active')}
                  onlyActiveOnIndex
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div styleName="contentWrapper">{children}</div>
      </div>
    );
  }
}

export default CSS(MyAccountSidebar, styles);
