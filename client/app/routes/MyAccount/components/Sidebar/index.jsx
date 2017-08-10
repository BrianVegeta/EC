import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Link } from 'react-router';

import myPropTypes from 'propTypes';
import Avatar from 'components/Avatar';
import { my } from 'lib/paths';

import CSS from 'react-css-modules';
import styles from './styles.sass';

const myAccountNavs = {
  items: { text: '分享/發布', path: my.itemPath },
  orders: { text: '收到的預訂', path: '/' },
  schedule: { text: '行事曆', path: '/' },
  records: { text: '預訂記錄', path: '/' },
  wishs: { text: '許願紙條', path: my.wishPath },
  coupon: { text: '優惠卷', path: my.couponPath },
  favorite: { text: '收藏', path: my.collectionPath },
  wallet: { text: '我的錢包', path: my.walletPath },
  score: { text: '評價', path: my.commentPath },
  profile: { text: '個人資料', path: '/' },
  account: { text: '帳戶管理', path: '/' },
};


class MyAccountSidebar extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
    user: PropTypes.shape({
      picture: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const navs = map(myAccountNavs, nav => nav);
    const { picture, name } = this.props.user;
    // TODO: USER AVATAR
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
            {navs.map((nav, index) => (
              <li key={`${index + 1}`} styleName="listItem">
                <Link to={nav.path} styleName="itemLink">
                  {nav.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div styleName="contentWrapper">{this.props.children}</div>
      </div>
    );
  }
}

export default CSS(MyAccountSidebar, styles);
