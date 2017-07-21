import Bank from './Bank';
import BankBranch from './BankBranch';
import SimpleInputModel from './SimpleInputModel';

export default class {
  constructor({ options, popupBankSetup, dispatch }) {
    // 真實姓名, 身分證號
    this.realNameModel = new SimpleInputModel({ popupBankSetup, dispatch }, 'realName');
    this.identityNoModel = new SimpleInputModel({ popupBankSetup, dispatch }, 'identityNo');
    // 電話, EMAIL
    this.phoneModel = new SimpleInputModel({ popupBankSetup, dispatch }, 'phone');
    this.emailModel = new SimpleInputModel({ popupBankSetup, dispatch }, 'email');
    // BANK, BRANCHS, 戶名, 帳號
    this.bankModel = new Bank({ options, popupBankSetup, dispatch });
    this.bankBranchModel = new BankBranch({ options, popupBankSetup, dispatch });
    this.accNameModel = new SimpleInputModel({ popupBankSetup, dispatch }, 'accName');
    this.accNoModel = new SimpleInputModel({ popupBankSetup, dispatch }, 'accNo');
    // PASSWORD CHECK
    this.pwdCheck = new SimpleInputModel({ popupBankSetup, dispatch }, 'pwdCheck');
  }
}
