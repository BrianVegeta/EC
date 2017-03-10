import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './css/header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="navbar navbar-static-top">
        <div className="container clear red-border">
          <div styleName="navbar-header">
            <a href="./" >
              <div styleName="brand" />
            </a>
          </div>
          <div styleName="navbar">
            <div styleName="navs-search">
              <input styleName="search-input" placeholder={'你的好物、服務、空間、分享人名稱'} />
            </div>
            <ul styleName="navs-right">
              <li styleName="nav">
                <a href="/">下載 App</a>
              </li>
              <li styleName="nav">
                <a href="/">幫助</a>
              </li>
              <li styleName="nav">
                <a href="/">註冊</a>
              </li>
              <li styleName="nav">
                <a href="/">登入</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}
export default CSS(Header, styles);
