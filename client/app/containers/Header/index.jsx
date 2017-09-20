/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { IndexLink, Link } from 'react-router';
import { isEqual } from 'lodash';
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


const NOTIFY_OWNER_CONTRACT = 'NOTIFY_OWNER_CONTRACT';
const NOTIFY_LESSEE_CONTRACT = 'NOTIFY_LESSEE_CONTRACT';
const NOTIFY_OTHER = 'NOTIFY_OTHER';
const cx = classnames.bind(styles);
class Header extends React.Component {

  static defaultProps = {
    hasPublishBtn: true,
    fixed: false,
    hasShortcut: false,
    searchable: false,
  };

  static propTypes = {
    hasPublishBtn: PropTypes.bool,
    fixed: PropTypes.bool,
    hasShortcut: PropTypes.bool,
    searchable: PropTypes.bool,
    auth: myPropTypes.authOnHeader.isRequired,
    dispatchLogout: PropTypes.func.isRequired,
    dispatchPublish: PropTypes.func.isRequired,
    dispatchNotify: PropTypes.func.isRequired,
    notification: PropTypes.shape({
      notifyData: PropTypes.array.isRequired,
      notifyCData: PropTypes.object.isRequired,
    }).isRequired,
  };

  static renderCircle() {
    return <span styleName="notice-circle" />;
  }

  componentDidMount() {
    const { auth } = this.props;
    if (auth.isLogin) {
      this.props.dispatchNotify();
      // this.props.dispatchCollection();
    }
  }

  shouldComponentUpdate(nextProps) {
    const {
      fixed,
      hasShortcut,
      searchable,
      auth,
      notification,
    } = this.props;
    if (
      isEqual(nextProps.fixed, fixed) &&
      isEqual(nextProps.hasShortcut, hasShortcut) &&
      isEqual(nextProps.searchable, searchable) &&
      isEqual(nextProps.auth, auth) &&
      isEqual(nextProps.notification, notification)
    ) {
      return false;
    }
    return true;
  }

  checkNotify(type) {
    const { notification } = this.props;
    switch (type) {
      case NOTIFY_OWNER_CONTRACT : {
        const { notifyCData: { owner_unread_count } } = notification;
        return Boolean(owner_unread_count && owner_unread_count > 0);
      }
      case NOTIFY_LESSEE_CONTRACT: {
        const { notifyCData: lessee_unread_count } = notification;
        return Boolean(lessee_unread_count && lessee_unread_count > 0);
      }
      case NOTIFY_OTHER: {
        const { notifyData } = notification;
        return Boolean(notifyData && notifyData.length > 0);
      }
      default:
        return false;
    }
  }

  render() {
    const {
      dispatchLogout,
      dispatchPublish,
      searchable,
      auth: { isLogin, currentUser },
      fixed,
      hasShortcut,
      hasPublishBtn,
    } = this.props;
    const { renderCircle } = this.constructor;
    const hasLesseeNotify = this.checkNotify(NOTIFY_LESSEE_CONTRACT);
    const hasOwnerNotify = this.checkNotify(NOTIFY_OWNER_CONTRACT);
    const hasOtherNotify = this.checkNotify(NOTIFY_OTHER);

    return (
      <header
        className={cn('navbar', {
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
                  <HeaderSearchContainer ref={this.refSearch} />
                </div>
              }
              <ul className="navs navs-right" >
                <NavItem action={SHAREAPP_HELP_URL} content="幫助" />
                {!isLogin && <NavItem action={registrationPath} content="註冊" />}
                {!isLogin && <NavItem action={loginPath} content="登入" />}
                {isLogin &&
                  <li className="nav" >
                    <Link to={my.lesseeOrderItem('TAB_REQUEST')}>
                      消費狀態{hasLesseeNotify && renderCircle()}
                    </Link>
                  </li>
                }
                {isLogin &&
                  <li className="nav" >
                    <Link to={my.ownerOrderItem('TAB_REQUEST')}>
                      廠商訂單{hasOwnerNotify && renderCircle()}
                    </Link>
                  </li>
                }
                {isLogin &&
                  <li className="nav" >
                    <Link to={notifyPath.contractNotifyPath}>
                      通知{hasOtherNotify && renderCircle()}
                    </Link>
                  </li>
                }
                {isLogin && hasPublishBtn &&
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
                        { link: my.collectionPath, text: '收藏' },
                        { link: my.myGoodsPath, text: '分享/發佈' },
                        { link: my.walletPath, text: '我的錢包' },
                        { link: my.commentOwnerPath, text: '評價' },
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
