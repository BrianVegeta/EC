// @author: vincent
import validate from 'validate.js';
import constraints from 'constraints';
import { changeNewWishForm } from 'actions/wishActions';


export default class {
  constructor({ title, dispatch }) {
    this.props = { title, dispatch };

    this.value = title;
    this.validator = this.validator.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  validator() {
    return validate.single(this.value, constraints.title);
  }

  onChange(title) {
    this.props.dispatch(
      changeNewWishForm({ title }),
    );
  }
}
