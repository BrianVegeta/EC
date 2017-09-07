import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { IndexLink, Link } from 'react-router';
import { SHAREAPP_HELP_URL } from 'constants/config';
import HeaderSearchContainer from 'containers/HeaderSearchContainer';
import HomeTopMenuContainer from 'containers/HomeTopMenuContainer';
import Logo from 'components/Icons/Logo';

import {
  my,
  notifyPath,
  registrationPath,
  loginPath,
} from 'lib/paths';

import classnames from 'classnames/bind';
import cn from 'classnames';
import CSS from 'react-css-modules';
import styles from './styles.sass';

import Me from './Me';
import DropdownNavs from './DropdownNavs';
import NavItem from './NavItem';


const cx = classnames.bind(styles);
class Header extends React.Component {

  static defaultProps = {
    fixed: false,
    hasShortcut: false,
    searchable: false,
  };

  static propTypes = {
    fixed: PropTypes.bool,
    hasShortcut: PropTypes.bool,
    searchable: PropTypes.bool,
    auth: myPropTypes.authOnHeader.isRequired,
    dispatchLogout: PropTypes.func.isRequired,
    dispatchPublish: PropTypes.func.isRequired,
    dispatchNotify: PropTypes.func.isRequired,
    // dispatchCollection: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { auth } = this.props;
    if (auth.isLogin) {
      this.props.dispatchNotify();
      // this.props.dispatchCollection();
    }
  }

  renderCircle(type) {
    const { notification } = this.props;
    switch (type) {
      case 0 : {
        const { notifyCData } = notification;
        if (notifyCData.owner_unread_count &&
          notifyCData.owner_unread_count > 0) {
          return (
            <div styleName="notice-circle" />
          );
        }
      }
        break;
      case 1: {
        const { notifyCData } = notification;
        if (notifyCData.lessee_unread_count &&
          notifyCData.lessee_unread_count > 0) {
          return (
            <div styleName="notice-circle" />
          );
        }
      }
        break;
      case 2 : {
        const { notifyData } = notification;
        if (notifyData && notifyData.length > 0) {
          return (
            <div styleName="notice-circle" />
          );
        }
      }
        break;
      default:
        return null;
    }

    return null;
  }

  render() {
    const {
      dispatchLogout,
      dispatchPublish,
      searchable,
      auth: { isLogin, currentUser },
      fixed,
      hasShortcut,
    } = this.props;

    const myOrdersPath = my.ownerOrderItem('TAB_REQUEST');
    const myLesseeOrdersPath = my.lesseeOrderItem('TAB_REQUEST');
    const myCommentsPath = my.commentOwnerPath;
    const myItemsPath = my.myGoodsPath;
    const myWalletPath = my.walletPath;
    const myCollectionPath = my.collectionPath;
    const notifyIndexPath = notifyPath.contractNotifyPath;
    // <NavItem action={notifyIndexPath} content="通知" />

    return (
      <header
        className={
          cn('navbar', {
            'navbar-static': !fixed,
            'navbar-fixed-top': fixed,
          })}
      >
        <div className="navbar-container">
          <div className="container clear">
            <div className="navbar-header">
              <IndexLink to={'/'}>
                <Logo />
              </IndexLink>
            </div>
            <div className="navbar">
              {searchable &&
                <div className={cx('navs-search')}>
                  <HeaderSearchContainer />
                </div>
              }
              <ul className="navs navs-right" >
                <NavItem action={SHAREAPP_HELP_URL} content="幫助" />
                {!isLogin && <NavItem action={registrationPath} content="註冊" />}
                {!isLogin && <NavItem action={loginPath} content="登入" />}
                {isLogin &&
                  <li className="nav" >
                    <Link to={myLesseeOrdersPath}>
                        消費狀態
                        {this.renderCircle(1)}
                    </Link>
                  </li>
                }
                {isLogin &&
                  <li className="nav" >
                    <Link to={myOrdersPath}>
                        廠商訂單
                        {this.renderCircle(0)}
                    </Link>
                  </li>
                }
                {isLogin &&
                  <li className="nav" >
                    <Link to={notifyIndexPath}>
                        通知
                        {this.renderCircle(2)}
                    </Link>
                  </li>
                }
                {isLogin &&
                  <NavItem
                    action={dispatchPublish}
                    content="發佈"
                    className={cx('publish-btn')}
                  />
                }
                {isLogin &&
                  <NavItem
                    style={{ padding: '20px 0 20px 35px', height: 71 }}
                    content={<Me currentUser={currentUser} />}
                  >
                    <DropdownNavs
                      list={[
                        { link: my.profilePath, text: '編輯個人資料' },
                        { link: my.manageVerifyPath, text: '帳戶管理' },
                        { link: myCollectionPath, text: '收藏' },
                        { link: myItemsPath, text: '分享/發佈' },
                        { link: myWalletPath, text: '我的錢包' },
                        { link: myCommentsPath, text: '評價' },
                        { action: dispatchLogout, text: '登出' },
                      ]}
                    />
                  </NavItem>
                }
              </ul>
            </div>
          </div>
        </div>
        {hasShortcut && <HomeTopMenuContainer {...this.props} />}
      </header>
    );
  }
}

export default CSS(Header, styles);
