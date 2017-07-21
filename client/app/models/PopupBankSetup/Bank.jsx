import { changeData } from 'actions/popupBankSetupActions';
import { prepareBankBranchs } from 'actions/optionsActions';

export default class {
  constructor({ options, popupBankSetup, dispatch }) {
    this.props = { options, popupBankSetup, dispatch };

    const { accBankId } = popupBankSetup;
    this.options = this.initOptions();
    this.value = accBankId;
    this.onSelect = this.onSelect.bind(this);
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
}
