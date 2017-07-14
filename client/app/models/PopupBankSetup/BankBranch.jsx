import validate from 'validate.js';
import _ from 'lodash';

import Selection from 'models/Selection';
import { changeData } from 'actions/popupBankSetupActions';

export default class extends Selection {
  constructor(props) {
    super(props);
    const { popupBankSetup } = this.props;

    this.value = popupBankSetup.accBankBranchId;
    this.disabled = _.isEmpty(popupBankSetup.accBankId);
  }

  initOptions() {
    const { options, popupBankSetup } = this.props;
    const { banks } = options;

    const bank = _.find(banks, { id: popupBankSetup.accBankId });
    if (bank && bank.branchs && bank.branchs.length > 0) {
      return bank.branchs.map(branch =>
        [branch.branchid, branch.branchname],
      );
    }
    return [];
  }

  onSelect(option) {
    this.props.dispatch(
      changeData({ accBankBranchId: option.value }),
    );
  }

  validator() {
    console.log('bank');
    return validate.single()
  }
}
