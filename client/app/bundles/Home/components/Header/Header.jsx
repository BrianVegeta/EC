import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import Navs from './Navs';
import Search from './Search';
import ShortcutNavbar from './ShortcutNavbar';

const propTypes = {
  auth: PropTypes.object.isRequired,
  routesHelper: PropTypes.object.isRequired,
};
class Header extends React.PureComponent {
  render() {
    const { auth, routesHelper } = this.props;
    return (
      <header className="navbar navbar-fixed-top" styleName="header">
        <div styleName="navbar-container">
          <div className="container clear">
            <div className="navbar-header">
              <IndexLink to={routesHelper.root}>
                <div className="brand" />
              </IndexLink>
            </div>
            <div className="navbar">
              <div styleName="navs-search">
                <Search />
              </div>
              {
                !auth.isLogin &&
                  <ul className="navs" styleName="navs-right">
                    <li className="nav"><Navs.DownloadApp /></li>
                    <li className="nav"><Navs.Help /></li>
                    <li className="nav"><Navs.Register /></li>
                    <li className="nav"><Navs.Login {...this.props} /></li>
                  </ul>
              }
              {
                auth.isLogin &&
                  <ul className="navs" styleName="navs-right">
                    <li className="nav"><Navs.DownloadApp /></li>
                    <li className="nav"><Navs.Notify /></li>
                    <li className="nav"><Navs.MyShop /></li>
                    <li className="nav"><Navs.Help /></li>
                    <li className="nav"><Navs.Me /></li>
                    <li className="nav"><Navs.Post /></li>
                  </ul>
              }
            </div>
          </div>
        </div>
        <div styleName="navbar-container">
          <div className="container clear">
            <ShortcutNavbar {...this.props} />
          </div>
        </div>
      </header>
    );
  }
}
Header.propTypes = propTypes;
export default Header;
