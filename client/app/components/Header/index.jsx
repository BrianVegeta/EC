import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import IconNotify from 'react-icons/lib/md/notifications-none';
import IconPublish from 'react-icons/lib/fa/plus-square-o';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Me from './Navs/Me';
import Post from './Navs/Post';
import HeaderSearch from '../HeaderSearch';
import ShortcutNavbar from './ShortcutNavbar';
import Logo from './Logo';
import NavItem from './NavItem';

const defaultProps = {
  hasShortcut: false,
  positionStatic: false,
};
const propTypes = {
  auth: PropTypes.object.isRequired,
  routesHelper: PropTypes.object.isRequired,
  hasShortcut: PropTypes.bool,
  positionStatic: PropTypes.bool,
};
class Header extends React.PureComponent {
  render() {
    const { auth, routesHelper, positionStatic } = this.props;
    return (
      <header
        className={`navbar ${positionStatic ? 'navbar-static' : 'navbar-fixed-top'}`}
        styleName="header"
      >
        <div styleName="navbar-container">
          <div className="container clear">
            <div className="navbar-header">
              <IndexLink to={routesHelper.root}>
                <Logo />
              </IndexLink>
            </div>
            <div className="navbar">
              <div styleName="navs-search">
                <HeaderSearch {...this.props} />
              </div>
              {
                !auth.isLogin &&
                  <ul className="navs" styleName="navs-right">
                    <NavItem className="nav" action="/">下載APP</NavItem>
                    <NavItem className="nav" action="https://www.shareapp.com.tw/faq">幫助</NavItem>
                    <NavItem className="nav" action="/p/registration">註冊</NavItem>
                    <NavItem className="nav" action="/p/login">登入</NavItem>
                  </ul>
              }
              {
                auth.isLogin &&
                  <ul className="navs" styleName="navs-right">
                    <NavItem className="nav" action="/">下載APP</NavItem>
                    <NavItem className="nav" action="https://www.shareapp.com.tw/faq">幫助</NavItem>
                    <NavItem className="nav" action="/">我的商店</NavItem>
                    <NavItem className="nav" action={() => console.log(1)}>
                      <IconNotify size={24} />
                    </NavItem>
                    <NavItem className="nav" action={() => console.log(1)}>
                      <IconPublish size={24} />
                    </NavItem>
                    <li className="nav"><Me /></li>
                  </ul>
              }
            </div>
          </div>
        </div>
        { this.props.hasShortcut && <div styleName="navbar-container-shortcut">
          <div className="container clear">
            <ShortcutNavbar {...this.props} />
          </div>
        </div> }
      </header>
    );
  }
}
Header.defaultProps = defaultProps;
Header.propTypes = propTypes;
export default CSS(Header, styles);
