import validate from 'validate.js';
import _ from 'lodash';
import constraints from './constraints';
import {
  updateCategory,
} from '../../../../actions/publishActions';

class Category {
  constructor(categoryId, dispatch) {
    this.id = categoryId;
    this.dispatch = dispatch;
    this.update = this.update.bind(this);
    this.validator = this.validator.bind(this);
  }
  update(category) {
    this.dispatch(updateCategory(category.id));
  }
  validator() {
    return validate.single(this.id, constraints.categoryId);
  }
  isValid() {
    return _.isEmpty(this.validator());
  }
  getCategoryNames(categories) {
    const categoryId = this.id;
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
    return `${parentCategory.text} > ${category.text}`;
  }
}
export default Category;
