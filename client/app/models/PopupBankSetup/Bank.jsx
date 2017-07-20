import validate from 'validate.js';
import Selection from 'models/Selection';
import { changeData } from 'actions/popupBankSetupActions';
import { prepareBankBranchs } from 'actions/optionsActions';
import constraints from 'constraints';

export default class extends Selection {
  constructor(props) {
    super(props);
    const { popupBankSetup } = this.props;

    this.value = popupBankSetup.accBankId;
  }

  initOptions() {
    const { banks } = this.props.options;
    return banks.map(bank =>
      [bank.id, bank.bankname],
    );
  }

  onSelect(option) {
    const accBankId = option.value;
    this.props.dispatch(
      changeData({ accBankId }),
    );

    this.props.dispatch(
      prepareBankBranchs(accBankId),
    );
  }

  validator() {
    return validate.single(this.value, constraints.accBankId);
  }
}
