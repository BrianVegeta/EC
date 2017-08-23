import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { IndexLink } from 'react-router';

import { SHAREAPP_HELP_URL } from 'constants/config';
import HeaderSearchContainer from 'containers/HeaderSearchContainer';
import HomeTopMenuContainer from 'containers/HomeTopMenuContainer';

import { my, notifyPath } from 'lib/paths';

import classnames from 'classnames/bind';
import cn from 'classnames';
import CSS from 'react-css-modules';
import styles from './styles.sass';

import Me from './Me';
import DropdownNavs from './DropdownNavs';
import Logo from './Logo';
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

    notification: myPropTypes.notification.isRequired,
    auth: myPropTypes.authOnHeader.isRequired,

    dispatch: PropTypes.func.isRequired,
    dispatchLogout: PropTypes.func.isRequired,
    dispatchPublish: PropTypes.func.isRequired,
  };

  render() {
    const {
      dispatch,
      dispatchLogout,
      dispatchPublish,
      searchable,
      auth,
      fixed,
      hasShortcut,
      notification,
    } = this.props;
    const { isLogin } = auth;

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
                <NavItem action="/" content="收藏" />
                {!isLogin && <NavItem action="/p/registration" content="註冊" />}
                {!isLogin && <NavItem action="/p/login" content="登入" />}
                {isLogin &&
                  <NavItem content="我的商店">
                    <DropdownNavs
                      list={[
                        { link: '/', text: '收到的預訂' },
                        { link: '/', text: '消費訂單' },
                        { link: '/', text: '分享/發佈' },
                        { link: '/', text: '我的錢包' },
                        { link: '/', text: '評價' },
                      ]}
                    />
                  </NavItem>
                }
                {isLogin &&
                  <NavItem
                    action={notifyPath.contractNotifyPath}
                    content="通知"
                  />
                }
                {isLogin &&
                  <NavItem
                    action={dispatchPublish}
                    content="發佈"
                    className={cx('publish-btn')}
                  />
                }
                {isLogin &&
                  <NavItem content={<Me currentUser={auth.currentUser} />}>
                    <DropdownNavs
                      list={[
                        { link: '/', text: '編輯個人資料' },
                        { link: my.indexPath, text: '帳戶管理' },
                        { link: '/', text: '設定' },
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
