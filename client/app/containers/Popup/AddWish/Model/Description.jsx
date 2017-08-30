// @author: vincent
import validate from 'validate.js';
import constraints from 'constraints';
import { changeNewWishForm } from 'actions/wishActions';


export default class {
  constructor({ description, dispatch }) {
    this.props = { description, dispatch };

    this.value = description;
    this.validator = this.validator.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  validator() {
    return validate.single(this.description, constraints.description);
  }

  onChange(description) {
    this.props.dispatch(
      changeNewWishForm({ description }),
    );
  }
}
