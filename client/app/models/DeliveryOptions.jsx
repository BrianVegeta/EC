const PERSONAL = '0';
const MAIL = '1';
const SEVEN = '2';
const locales = {
  [PERSONAL]: '面交（自行協調取貨地點）',
  [MAIL]: '自行寄件',
  [SEVEN]: '7-11交貨便',
};
export default class {
  static localize(code) {
    return locales[code];
  }
  static option(value, text) {
    return { value, text };
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

}
