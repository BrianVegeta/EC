import _ from 'lodash';
import { changeData } from 'actions/popupBankSetupActions';

export default class {
  constructor({ options, popupBankSetup, dispatch }) {
    this.props = { options, popupBankSetup, dispatch };

    const { accBankId, accBankBranchId } = popupBankSetup;
    this.options = this.initOptions();
    this.disabled = _.isEmpty(accBankId);
    this.value = accBankBranchId;
    this.onSelect = this.onSelect.bind(this);
  }

  initOptions() {
    const { options, popupBankSetup } = this.props;
    const { banks } = options;

    const bank = _.find(banks, { id: popupBankSetup.accBankId });
    if (bank && bank.branchs && bank.branchs.length > 0) {
      return bank.branchs.map(branch => [branch.branchid, branch.branchname]);
    }
    return [];
  }

  onSelect(option) {
    this.props.dispatch(
      changeData({ accBankBranchId: option.value }),
    );
  }
}
