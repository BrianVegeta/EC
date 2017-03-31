import React, { PropTypes } from 'react';
import Navs from './Navs';
import Search from './Search';

const propTypes = {
  auth: PropTypes.object.isRequired,
};
class Header extends React.PureComponent {
  render() {
    const { auth } = this.props;
    return (
      <header className="navbar navbar-fixed-top" styleName="header">
        <div className="container clear red-border">
          <div className="navbar-header">
            <a href="/" ><div className="brand" /></a>
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
      </header>
    );
  }
}
Header.propTypes = propTypes;
export default Header;
