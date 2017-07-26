import React from 'react';
import { Link } from 'react-router';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const navs = [
  { name: '分享服務', href: '/p/i/service' },
  { name: '租借空間', href: '/p/i/space' },
  { name: '租借物品', href: '/p/i/goods' },
  { name: '分享王', href: '/' },
  { name: '許願看板', href: '/' },
];

const cx = classnames.bind(styles);
class ShortcutNavbar extends React.Component {
  render() {
    return (
      <div className="navbar" styleName="navs-center">
        <ul className="navs clear">
          {navs.map((nav, i) => (
            <li key={`${i + 1}`} styleName="nav">
              <Link
                to={nav.href}
                styleName="link"
                activeClassName={cx('active')}
                onlyActiveOnIndex
              >
                {nav.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default CSS(ShortcutNavbar, styles);
