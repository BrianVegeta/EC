import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { IndexLink } from 'react-router';

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
  };

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
                <NavItem action={myCollectionPath} content="收藏" />
                {!isLogin && <NavItem action={registrationPath} content="註冊" />}
                {!isLogin && <NavItem action={loginPath} content="登入" />}
                {isLogin &&
                  <NavItem content="我的商店">
                    <DropdownNavs
                      list={[
                        { link: myOrdersPath, text: '廠商訂單' },
                        { link: myLesseeOrdersPath, text: '消費狀態' },
                        { link: myItemsPath, text: '分享/發佈' },
                        { link: myWalletPath, text: '我的錢包' },
                        { link: myCommentsPath, text: '評價' },
                      ]}
                    />
                  </NavItem>
                }
                {isLogin && <NavItem action={notifyIndexPath} content="通知" />}
                {isLogin &&
                  <NavItem
                    action={dispatchPublish}
                    content="發佈"
                    className={cx('publish-btn')}
                  />
                }
                {isLogin &&
                  <NavItem content={<Me currentUser={currentUser} />}>
                    <DropdownNavs
                      list={[
                        { link: my.profilePath, text: '編輯個人資料' },
                        { link: my.manageVerifyPath, text: '帳戶管理' },
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
