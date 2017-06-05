import React, { PropTypes } from 'react';
import _ from 'lodash';
import SelectionButton from '../SelectionButton';
import Dropdown from './Dropdown';

class SelectionCategory extends React.Component {
  static defaultProps = {
    categories: null,
    placeholder: null,
    categoryId: null,
    onBlur: null,
  };
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    categoryId: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.onCategorySelect = this.onCategorySelect.bind(this);
  }
  onCategorySelect(category) {
    this.props.onChange(category);
    this.selectBtn.closeDropdown();
  }
  getCategoryNames() {
    const { categoryId, categories } = this.props;
    if (!categoryId) return '';

    let parentCategory = null;
    let category = null;
    _.forEach(categories, parentCate =>
      _.forEach(parentCate.subcates, (cate) => {
        if (cate.id === _.parseInt(categoryId)) {
          category = cate;
          parentCategory = parentCate;
          return false;
        }
        return true;
      }),
    );
    return `${parentCategory.text}/${category.text}`;
  }
  render() {
    const { categories, placeholder, onBlur } = this.props;
    const btnProps = {
      ref: sb => (this.selectBtn = sb),
      placeholder,
      value: this.getCategoryNames(),
      onBlur,
    };
    const dropdownProps = {
      categories,
      onSelect: this.onCategorySelect,
    };
    return (
      <SelectionButton {...btnProps}>
        <Dropdown {...dropdownProps} />
      </SelectionButton>
    );
  }
}
export default SelectionCategory;
