import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import {
  userprofilePaths,
} from 'lib/paths';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const {
  indexPath,
  itemsServiePath,
  itemsSpacePath,
  wishListPath,
  commentsOwnerPath,
  commentsLesseePath,
} = userprofilePaths;

const cx = classnames.bind(styles);
class Navigation extends React.Component {

  static propTypes = {
    uid: PropTypes.string.isRequired,
  };

  render() {
    const { uid } = this.props;
    const navs = [
      { name: '物品', href: indexPath(uid) },
      { name: '服務', href: itemsServiePath(uid) },
      { name: '空間', href: itemsSpacePath(uid) },
      { name: '許願紙條', href: wishListPath(uid) },
      { name: '分享人評價', href: commentsOwnerPath(uid) },
      { name: '享用人評價', href: commentsLesseePath(uid) },
    ];
    return (
      <div styleName="container">
        <ul className="clear">
          {navs.map((nav, index) => (
            <Link
              key={`${index + 1}`}
              to={nav.href}
              activeClassName={cx('active')}
              onlyActiveOnIndex
            >
              <li>{nav.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default CSS(Navigation, styles);
