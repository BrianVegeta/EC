import React from 'react';
import PropTypes from 'prop-types';
import ReactHoverObserver from 'react-hover-observer';
import {
  find,
} from 'lodash';

import ListItem from './ListItem';
import SubCategories from './SubCategories';

class ParentCategory extends React.Component {

  static propTypes = {
    categoryID: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    category: PropTypes.shape({
      children: PropTypes.array.isRequired,
    }).isRequired,
    isUsed: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.onSubCategoriesExpand = this.onSubCategoriesExpand.bind(this);

    this.state = {
      isExpanding: false,
    };
  }

  onSubCategoriesExpand() {
    this.setState({ isExpanding: !this.state.isExpanding });
  }

  render() {
    const { category, isActive, categoryID, isUsed } = this.props;
    const { isExpanding } = this.state;
    const inSubCategories = find(category.children, { id: parseInt(categoryID, 10) });

    return (
      <div>
        <ReactHoverObserver >
          <ListItem
            isActive={isActive}
            category={category}
            isUsed={isUsed}
            isSubCategoryOpen={isExpanding}
            onSubCategoriesExpand={this.onSubCategoriesExpand}
          />
        </ReactHoverObserver>
        {
          (isExpanding || inSubCategories) &&
          <SubCategories
            subCategories={category.children}
            categoryID={categoryID}
            isUsed={isUsed}
          />
        }
      </div>
    );
  }
}

export default ParentCategory;
