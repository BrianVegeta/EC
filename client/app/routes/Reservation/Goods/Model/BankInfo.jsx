import _ from 'lodash';

export default class {
  constructor(bankInfo, dispatch) {
    const {
      bankName,
      // bankNumber,
      // bankBranchName,
      // phone,
      // email,
      // accName,
      // accNumber,
      // realName,
      // idNumber,
    } = bankInfo;

    this.bankNameDesc = _.isEmpty(bankName) ? null : bankName;
    this.dispatch = dispatch;
  }
}
