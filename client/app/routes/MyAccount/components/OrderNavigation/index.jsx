import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class Navigation extends React.Component {

  static propTypes = {
    navs: PropTypes.arrayOf(PropTypes.shape(
      {
        name: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      }
    ).isRequired).isRequired,
  };

  render() {
    const { navs } = this.props;
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
              <li>
                {nav.name}
                {<div styleName="notice-circle">1</div>}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default CSS(Navigation, styles);
