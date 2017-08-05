import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { categoriedItemPath } from 'lib/paths';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class SubCategories extends React.Component {

  static propTypes = {
    categoryID: PropTypes.string.isRequired,
    subCategories: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
  };

  render() {
    const { props: { subCategories, categoryID } } = this;
    return (
      <ul styleName="container">
        {subCategories.map(subcategory => (
          <Link
            key={subcategory.id}
            to={categoriedItemPath(subcategory.name, subcategory.id)}
            onlyActiveOnIndex
          >
            <li className={cx('list-item', { active: categoryID === subcategory.id.toString() })}>
              {subcategory.name}
            </li>
          </Link>
        ))}
      </ul>
    );
  }
}

export default CSS(SubCategories, styles);
