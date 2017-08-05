import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';

import { findTopCategory } from 'lib/category';

import CSS from 'react-css-modules';
import styles from './styles.sass';

import ListItem from './ListItem';
import ParentCategory from './ParentCategory';

class SidebarCategoriesContainer extends React.Component {

  static propTypes = {
    categoryID: PropTypes.string.isRequired,
    options: myPropTypes.options.isRequired,
  };

  render() {
    const {
      options: { categories },
      categoryID,
    } = this.props;

    const topCategory = findTopCategory(categoryID, categories);
    return (
      <div styleName="container">
        <ul styleName="list-container">
          {categories[topCategory].map(category => (
            <li key={category.id}>
              {
                category.children ?
                  <ParentCategory
                    category={category}
                    categoryID={categoryID}
                    isActive={category.id.toString() === categoryID}
                  /> :
                  <ListItem
                    category={category}
                    isActive={category.id.toString() === categoryID}
                  />
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
