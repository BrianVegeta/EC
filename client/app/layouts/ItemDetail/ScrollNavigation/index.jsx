import React from 'react';
import Scrollchor from 'react-scrollchor';
import Scrollspy from 'react-scrollspy';

import itemDetailScrollNavs from 'constants/itemDetailScrollNavs';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
const Navs = () => {
  const scrollItems = itemDetailScrollNavs.map(nav => nav.id);
  return (
    <ul styleName="navs">
      <Scrollspy items={scrollItems} currentClassName={cx('active')}>
        {itemDetailScrollNavs.map(nav =>
          <li key={nav.id}>
            <Scrollchor to={nav.id} animate={{ duration: 200 }}>
              <div styleName="nav">{nav.text}</div>
            </Scrollchor>
          </li>,
        )}
      </Scrollspy>
    </ul>
  );
};
export default CSS(Navs, styles);
