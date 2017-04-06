import React, { PropTypes } from 'react';
import { Link } from 'react-router';


class ShortcutNavbar extends React.Component {
  render() {
    const { routesHelper } = this.props;
    return (
      <div className="navbar" styleName="navs-center">
        <ul className="navs clear">
          <li className="nav" styleName="nav">
            <Link to={routesHelper.items.goods} styleName="link">
              <div styleName="icon-container">
                <i className="fa fa-suitcase" />
              </div>
              <div styleName="name-container">
                <span>物品</span>
              </div>
            </Link>
          </li>
          <li className="nav" styleName="nav">
            <Link to={routesHelper.items.service} styleName="link">
              <div styleName="icon-container">
                <i className="fa fa-group" />
              </div>
              <div styleName="name-container">
                <span>服務</span>
              </div>
            </Link>
          </li>
          <li className="nav" styleName="nav">
            <Link to={routesHelper.items.space} styleName="link">
              <div styleName="icon-container">
                <i className="fa fa-home" />
              </div>
              <div styleName="name-container">
                <span>空間</span>
              </div>
            </Link>
          </li>
          <li className="nav" styleName="nav">
            <a href="/" styleName="link">
              <div styleName="icon-container">
                <i className="fa fa-trophy" />
              </div>
              <div styleName="name-container">
                <span>排行榜</span>
              </div>
            </a>
          </li>
          <li className="nav" styleName="nav">
            <a href="/" styleName="link">
              <div styleName="icon-container">
                <i className="fa fa-magic" />
              </div>
              <div styleName="name-container">
                <span>許願看板</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
export default ShortcutNavbar;
