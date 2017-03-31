import React, { PropTypes } from 'react';

class ShortcutNavbar extends React.Component {
  render() {
    return (
      <div className="navbar" styleName="navs-center">
        <ul className="navs clear">
          <li className="nav" styleName="nav">
            <a href="/" styleName="link">
              <div styleName="icon-container">
                <i className="fa fa-suitcase" />
              </div>
              <div styleName="name-container">
                <span>物品</span>
              </div>
            </a>
          </li>
          <li className="nav" styleName="nav">
            <a href="/" styleName="link">
              <div styleName="icon-container">
                <i className="fa fa-group" />
              </div>
              <div styleName="name-container">
                <span>服務</span>
              </div>
            </a>
          </li>
          <li className="nav" styleName="nav">
            <a href="/" styleName="link">
              <div styleName="icon-container">
                <i className="fa fa-home" />
              </div>
              <div styleName="name-container">
                <span>空間</span>
              </div>
            </a>
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
