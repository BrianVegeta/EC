import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { has } from 'lodash';
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
        tabName: PropTypes.string.isRequired,
      },
    ).isRequired).isRequired,
    unreads: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    unreads: [],
  }
  renderCircle(tabName) {
    const { unreads } = this.props;
    if (!has(unreads, tabName) || unreads[tabName] <= 0) return null;
    return <div styleName="notice-circle">{unreads[tabName]}</div>;
  }
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
                {this.renderCircle(nav.tabName)}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}

export default CSS(Navigation, styles);
