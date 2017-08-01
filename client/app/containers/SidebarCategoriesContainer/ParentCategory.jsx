import React from 'react';
import PropTypes from 'prop-types';
import ReactHoverObserver from 'react-hover-observer';

import ListItem from './ListItem';
import SubCategories from './SubCategories';

class ParentCategory extends React.Component {

  static propTypes = {
    category: PropTypes.shape({
      children: PropTypes.array.isRequired,
    }).isRequired,
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
    const { category } = this.props;
    const { isExpanding } = this.state;
    return (
      <div>
        <ReactHoverObserver >
          <ListItem
            category={category}
            isSubCategoryOpen={isExpanding}
            onSubCategoriesExpand={this.onSubCategoriesExpand}
          />
        </ReactHoverObserver>
        {isExpanding && <SubCategories subCategories={category.children} />}
      </div>
    );
  }
}

export default ParentCategory;
