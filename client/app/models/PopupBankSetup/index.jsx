import RealName from './RealName';
import IdentityNo from './IdentityNo';

import Bank from './Bank';
import BankBranch from './BankBranch';
import AccName from './AccName';
import AccNo from './AccNo';

import PwdCheck from './PwdCheck';

export default class {
  constructor(props) {
    this.realName = new RealName(props);
    this.identityNo = new IdentityNo(props);

    this.phone = props.popupBankSetup.phone;
    this.email = props.popupBankSetup.email;

    this.bank = new Bank(props);
    this.bankBranch = new BankBranch(props);
    this.accName = new AccName(props);
    this.accNo = new AccNo(props);

    this.pwdCheck = new PwdCheck(props);
  }
}
