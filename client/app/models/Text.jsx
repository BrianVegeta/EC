export default class {
  constructor(props) {
    this.props = props;
    this.onChange = this.onChange.bind(this);
    this.validator = this.validator.bind(this);
  }

  // onChange(value) {
  //   console.log('value');
  // }

  // validator() {
  //   return validate.single(value, constraints);
  // }
}
