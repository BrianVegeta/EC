import React from 'react';
import PropTypes from 'prop-types';
import {
  find,
  forEach,
} from 'lodash';
import SelectionButton from 'components/Input/SelectionBtn';
import hasError from 'components/Input/hoc/hasError';

import Dropdown from './Dropdown';

class SelectionCategory extends React.Component {

  static defaultProps = {
    categories: null,
    placeholder: null,
    categoryId: null,
    onBlur: null,
    singleLevel: false,
  };

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired),
    placeholder: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    categoryId: PropTypes.number,
    singleLevel: PropTypes.bool,
    // from Container
    dispatchFetchCategories: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onCategorySelect = this.onCategorySelect.bind(this);
  }

  componentDidMount() {
    this.props.dispatchFetchCategories();
  }

  onCategorySelect(category) {
    this.props.onSelect(category);
    this.selectBtn.closeDropdown();
  }

  getCategoryNames() {
    const { categoryId, categories, singleLevel } = this.props;

    if (!categoryId) return '';
    if (singleLevel) {
      return find(categories, { id: categoryId }).name;
    }
    let parentCategory = null;
    let category = null;
    forEach(categories, parentCate =>
      forEach(parentCate.children, (cate) => {
        if (cate.id === parseInt(categoryId, 10)) {
          category = cate;
          parentCategory = parentCate;
          return false;
        }
        return true;
      }),
    );

    return `${parentCategory.name}/${category.name}`;
  }

  render() {
    const { categories, placeholder, onBlur, singleLevel } = this.props;
    if (!categories) return null;

    const btnProps = {
      ref: sb => (this.selectBtn = sb),
      placeholder,
      value: this.getCategoryNames(),
      onBlur,
    };
    const dropdownProps = {
      categories,
      onSelect: this.onCategorySelect,
      singleLevel,
    };
    return (
      <SelectionButton {...btnProps}>
        <Dropdown {...dropdownProps} />
      </SelectionButton>
    );
  }
}
export default hasError(SelectionCategory);
