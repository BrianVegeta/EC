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
  fansPath,
  trackPath,
} = userprofilePaths;

const cx = classnames.bind(styles);
class Navigation extends React.Component {

  static propTypes = {
    uid: PropTypes.string.isRequired,
  };

  render() {
    const { uid } = this.props;
    const navs = [
      { name: '粉絲', href: fansPath(uid) },
      { name: '追蹤清單', href: trackPath(uid) },
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
