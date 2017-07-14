import _ from 'lodash';

export default class {

  static formatOption(value, text) {
    return { value, text };
  }

  constructor(props) {
    this.optionsData = [];

    this.props = props;
    this.options = this.generateInitOptions();
    this.onSelect = this.onSelect.bind(this);
    this.validator = this.validator.bind(this);
  }

  generateInitOptions() {
    return this.initOptions().map(option =>
      this.constructor.formatOption(option[0], option[1]),
    );
  }

  initOptions() {
    return this.optionsData;
  }

  getOptionByVal(value) {
    return _.find(this.options, { value });
  }

  // onSelect(option) {
  //   console.log(option);
  // }

  // validator() {
  //   return validate.single(value, constraints);
  // }
}
