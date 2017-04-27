import React from 'react';
import { Link } from 'react-router';
import navsMapper from './navsMapper';

class SidebarNavs extends React.Component {

  static isNavUnlocked(nav) {
    return nav.text === '上傳照片';
  }

  rAnchor(nav) {
    const { isNavUnlocked } = this.constructor;
    if (isNavUnlocked(nav)) {
      return (
        <Link to="/" styleName="nav-link">
          <div styleName="nav">
            <span styleName="icon" />
            <div styleName="nav-text">{nav.text}</div>
          </div>
        </Link>
      );
    }
    return (
      <div styleName="nav-locked">
        <div styleName="nav">
          <span styleName="icon" />
          <div styleName="nav-text">{nav.text}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <ul styleName="container">
        {navsMapper.map((nav, i) =>
          <li key={`${i + 1}`}>{this.rAnchor(nav)}</li>,
        )}
      </ul>
    );
  }
}

export default SidebarNavs;
