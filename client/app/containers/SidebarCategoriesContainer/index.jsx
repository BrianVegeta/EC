import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';

import {
  CATEGORY_GOODS,
  CATEGORY_SERVICE,
  CATEGORY_SPACE,
} from 'constants/enums';

import CSS from 'react-css-modules';
import styles from './styles.sass';

import ListItem from './ListItem';
import ParentCategory from './ParentCategory';

class SidebarCategoriesContainer extends React.Component {

  static propTypes = {
    topCategory: PropTypes.oneOf([
      CATEGORY_GOODS,
      CATEGORY_SERVICE,
      CATEGORY_SPACE,
    ]).isRequired,
    options: myPropTypes.options.isRequired,
  };

  render() {
    const { options: { categories }, topCategory } = this.props;

    return (
      <div styleName="container">
        <ul styleName="list-container">
          {categories[topCategory].map(category => (
            <li key={category.id}>
              {
                category.children ?
                  <ParentCategory category={category} /> :
                  <ListItem category={category} />
              }
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { options } = state;
  return { options };
};
export default connect(mapStateToProps)(CSS(SidebarCategoriesContainer, styles));
