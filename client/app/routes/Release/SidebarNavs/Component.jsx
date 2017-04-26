import React, { PropTypes } from 'react';
import Scrollchor from 'react-scrollchor';
import navsMapper from './navsMapper';

class SidebarNavs extends React.Component {

  static isNavUnlocked(nav) {
    return nav.text === '上傳照片';
  }

  rAnchor(nav) {
    const { isNavUnlocked } = this.constructor;
    if (isNavUnlocked(nav)) {
      const scrollchorConfig = {
        to: nav.labelFor,
        animate: { duration: 200 },
      };
      return (
        <Scrollchor styleName="nav-link" {...scrollchorConfig} >
          <div styleName="nav">
            <span styleName="icon" />
            <div styleName="nav-text">{nav.text}</div>
          </div>
        </Scrollchor>
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
