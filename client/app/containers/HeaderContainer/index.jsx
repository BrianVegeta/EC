import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';
import classnames from 'classnames/bind';
import cn from 'classnames';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import myPropTypes from '../../propTypes';
import Me from './Me';
import ShortcutNavbar from './ShortcutNavbar';
import DropdownNavs from './DropdownNavs';
import Logo from './Logo';
import NavItem from './NavItem';
import Notification from './Notification';
import { SHAREAPP_HELP_URL } from '../../constants/urls';
import HeaderSearchContainer from '../../containers/HeaderSearchContainer';
import { logout } from '../../actions/authActions';

const cx = classnames.bind(styles);
class Header extends React.Component {

  static defaultProps = {
    fixed: false,
    hasShortcut: false,
    searchable: false,
  };

  static propTypes = {
    notification: myPropTypes.notification.isRequired,
    auth: myPropTypes.authOnHeader.isRequired,
    dispatch: PropTypes.func.isRequired,

    fixed: PropTypes.bool,
    hasShortcut: PropTypes.bool,
    searchable: PropTypes.bool,
  };

  render() {
    const {
      dispatch,
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
                        { action: () => dispatch(logout()), text: '登出' },
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

const mapStateToProps = (state) => {
  const { environment, auth, notification } = state;
  return ({ environment, auth, notification });
};
export default connect(mapStateToProps)(CSS(Header, styles));
