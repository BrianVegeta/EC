import _ from 'lodash';

const PERSONAL = '0';
const MAIL = '1';
const SEVEN = '2';

const LOCALES = {
  [PERSONAL]: '面交（自行協調取貨地點）',
  [MAIL]: '自行寄件',
  [SEVEN]: '7-11交貨便',
};

export default class {

  static localize(code) {
    return LOCALES[code];
  }

  static option(value, text) {
    return { value, text };
  }

  static valueFromOption(option) {
    return option.value || '';
  }

  static checkAddressesNecessary(input) {
    return input.includes(MAIL);
  }

  static choosingMail(input) {
    return input.includes(MAIL);
  }

  static choosingPersonal(input) {
    return input.includes(PERSONAL);
  }

  static choosingSeven(input) {
    return input.includes(SEVEN);
  }

  constructor(option, dispatch) {
    this.dispatch = dispatch;
    this.option = option;
    this.options = this.toOptions();
    this.isOptionAlone = (this.options.length === 1);
    this.singleOptionDesc = this.options[0].text;
    this.needAddresses = this.option.includes(MAIL);
  }

  toOptions() {
    return this.option.split('').map(optCode => (
      this.constructor.option(optCode, this.constructor.localize(optCode))
    ));
  }

  getOptionFromValue(value) {
    return _.find(this.options, { value });
  }
}
