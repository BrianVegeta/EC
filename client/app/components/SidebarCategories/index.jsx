import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import ListItem from './ListItem';
import ParentCategory from './ParentCategory';

class SidebarCategories extends React.Component {

  static propTypes = {
    categoryID: PropTypes.string.isRequired,
    categories: myPropTypes.middleCategories.isRequired,
  };

  render() {
    const {
      categories,
      categoryID,
    } = this.props;

    return (
      <div styleName="container">
        <ul styleName="list-container">
          {categories.map(category => (
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

export default CSS(SidebarCategories, styles);
