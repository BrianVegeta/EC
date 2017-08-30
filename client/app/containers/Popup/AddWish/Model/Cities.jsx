// @author: vincent
import validate from 'validate.js';
import constraints from 'constraints';
import { changeNewWishForm } from 'actions/wishActions';

export default class {

  constructor({ cityName, areaName, dispatch }) {
    this.props = { cityName, areaName, dispatch };


    this.cityarea = { cityName, areaName };
    this.onSelect = this.onSelect.bind(this);
    this.validator = this.validator.bind(this);
  }

  validator() {
    const { cityName, areaName } = this.props;
    return validate.single(`${cityName}${areaName}`, constraints.cities);
  }

  onSelect(cityName, areaName) {
    this.props.dispatch(
      changeNewWishForm({ cityName, areaName }),
    );
  }

}
