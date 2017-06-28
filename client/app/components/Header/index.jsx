import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import IconNotify from 'react-icons/lib/md/notifications-none';
import IconPublish from 'react-icons/lib/fa/plus-square-o';
import classnames from 'classnames/bind';
import cn from 'classnames';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Me from './Me';
import Post from './Navs/Post';
import HeaderSearch from '../HeaderSearch';
import ShortcutNavbar from './ShortcutNavbar';
import DropdownNavs from './DropdownNavs';
import Logo from './Logo';
import NavItem from './NavItem';
import Notification from './Notification';
import { SHAREAPP_HELP_URL } from '../../constants/urls';

const cx = classnames.bind(styles);
class Header extends React.Component {
  static defaultProps = {
    hasShortcut: false,
    hasSearch: false,
    positionStatic: false,
  };
  static propTypes = {
    notification: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
    auth: PropTypes.object.isRequired,
    routesHelper: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    hasShortcut: PropTypes.bool,
    hasSearch: PropTypes.bool,
    positionStatic: PropTypes.bool,
  };
  render() {
    const {
      auth,
      routesHelper,
      positionStatic,
      hasSearch,
      hasShortcut,
      notification,
    } = this.props;
    const { isLogin } = auth;
    return (
      <header
        className={
          cn('navbar', {
            'navbar-static': positionStatic,
            'navbar-fixed-top': !positionStatic,
          })}
      >
        <div className="navbar-container">
          <div className="container clear">
            <div className="navbar-header">
              <IndexLink to={routesHelper.root}>
                <Logo />
              </IndexLink>
            </div>
            <div className="navbar">
              { hasSearch &&
                <div className={cx('navs-search')}>
                  <HeaderSearch {...this.props} />
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
                        { link: '/', text: '分享/發布' },
                        { link: '/', text: '我的錢包' },
                        { link: '/', text: '評價' },
                      ]}
                    />
                  </NavItem>
                }
                {isLogin &&
                  <NavItem content="通知">
                    <Notification
                      notification={notification}
                      dispatch={this.props.dispatch}
                    />
                  </NavItem>
                }
                {isLogin &&
                  <NavItem content={<div className={cx('publishBtn')}>發佈</div>} >
                    <div>test</div>
                  </NavItem>
                }
                {isLogin &&
                  <NavItem content={<Me currentUser={auth.currentUser} />}>
                    <DropdownNavs
                      list={[
                        { link: '/', text: '編輯個人資料' },
                        { link: '/', text: '帳戶管理' },
                        { link: '/', text: '設定' },
                        { link: '/', text: '登出' },
                      ]}
                    />
                  </NavItem>
                }
              </ul>
            </div>
          </div>
        </div>
        {hasShortcut &&
          <div className={cx('navbar-container-shortcut')}>
            <div className="container clear">
              <ShortcutNavbar {...this.props} />
            </div>
          </div>
        }
      </header>
    );
  }
}
export default CSS(Header, styles);
