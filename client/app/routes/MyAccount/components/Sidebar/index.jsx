import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { split } from 'lodash';
import myPropTypes from 'propTypes';
import Avatar from 'components/Avatar';
// import { my as mineRouter } from 'lib/paths';
import AccountNavs from 'constants/myAccountNavs';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
// const navs = [
//   ['上架紀錄', mineRouter.myGoodsPath],
//   ['商家訂單', mineRouter.ownerOrderItem('TAB_REQUEST')],
//   ['行事曆', mineRouter.calendarPath],
//   ['消費狀態', mineRouter.lesseeOrderItem('TAB_REQUEST')],
//   ['許願紙條', mineRouter.wishPath],
//   ['優惠券', mineRouter.couponPath],
//   ['收藏', mineRouter.collectionPath],
//   ['我的錢包', mineRouter.walletPath],
//   ['評價', mineRouter.commentOwnerPath],
//   ['公開資訊', mineRouter.profilePath],
//   ['帳號管理', mineRouter.manageVerifyPath],
//   ['收款設定', mineRouter.bankSetupPath],
// ];


class MyAccountSidebar extends React.Component {

  static propTypes = {
    children: myPropTypes.children.isRequired,
    user: PropTypes.shape({
      picture: PropTypes.string,
      name: PropTypes.string.isRequired,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    const navs = [
      [AccountNavs.items.text, AccountNavs.items.path],
      [AccountNavs.ownerOrder.text, AccountNavs.ownerOrder.path],
      [AccountNavs.calendar.text, AccountNavs.calendar.path],
      [AccountNavs.lesseeOrder.text, AccountNavs.lesseeOrder.path],
      [AccountNavs.wishs.text, AccountNavs.wishs.path],
      [AccountNavs.coupon.text, AccountNavs.coupon.path],
      [AccountNavs.collection.text, AccountNavs.collection.path],
      [AccountNavs.wallet.text, AccountNavs.wallet.path],
      [AccountNavs.comment.text, AccountNavs.comment.path],
      [AccountNavs.profile.text, AccountNavs.profile.path],
      [AccountNavs.manageVerify.text, AccountNavs.manageVerify.path],
      [AccountNavs.bankSetUp.text, AccountNavs.bankSetUp.path],
    ];

    this.state = {
      navs,
    };
    this.updatePath();
  }

  componentWillUpdate() {
    this.updatePath();
  }

  updatePath() {
    const { pathname } = this.props;
    const splitResult = split(pathname, '/', 4);
    if (splitResult.length === 4) {
      const { navs } = this.state;
      switch (splitResult[3]) {
        case 'items':
          navs[0] = [AccountNavs.items.text, pathname];
          break;
        case 'oo':
          navs[1] = [AccountNavs.ownerOrder.text, pathname];
          break;
        case 'lo':
          navs[3] = [AccountNavs.lesseeOrder.text, pathname];
          break;
        case 'wallet':
          navs[7] = [AccountNavs.wallet.text, pathname];
          break;
        case 'comment':
          navs[8] = [AccountNavs.comment.text, pathname];
          break;
        case 'manage':
          navs[10] = [AccountNavs.manageVerify.text, pathname];
          break;
        default:
          break;
      }
    }
  }

  render() {
    const { children, user: { picture, name } } = this.props;
    const { navs } = this.state;
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
