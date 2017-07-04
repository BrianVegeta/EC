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
  static decode(option) {
    return option.split('').map(optCode => ({
      value: optCode, text: this.localize(optCode),
    }));
  }
  static encode(options) {
    return options;
  }
}
