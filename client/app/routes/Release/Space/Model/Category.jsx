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
    return _.find(categories, { id: this.id }).text;
  }
}
export default Category;
