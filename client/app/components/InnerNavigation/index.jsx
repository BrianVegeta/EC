import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class InnerNavication extends React.Component {

  static propTypes = {
    navs: PropTypes.arrayOf(
      PropTypes.array.isRequired,
    ).isRequired,
  };

  render() {
    const { navs } = this.props;
    return (
      <div styleName="container">
        <ul className="clear">
          {navs.map(([name, path], index) => (
            <Link
              key={`${index + 1}`}
              activeClassName={cx('active')}
              onlyActiveOnIndex
              to={path}
            >
              <li>{name}</li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default CSS(InnerNavication, styles);
