import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { categoriedItemPath } from 'lib/paths';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class SubCategories extends React.Component {

  static propTypes = {
    subCategories: PropTypes.arrayOf(
      PropTypes.object,
    ).isRequired,
  };

  render() {
    const { props: { subCategories } } = this;
    return (
      <ul styleName="container">
        {subCategories.map(subcategory => (
          <Link
            key={subcategory.id}
            to={categoriedItemPath(subcategory.name, subcategory.id)}
            onlyActiveOnIndex
          >
            <li styleName="list-item">{subcategory.name}</li>
          </Link>
        ))}
      </ul>
    );
  }
}

export default CSS(SubCategories, styles);