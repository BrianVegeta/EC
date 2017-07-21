import { changeData } from 'actions/popupBankSetupActions';

export default class {
  constructor({ popupBankSetup, dispatch }, stateName) {
    this.stateName = stateName;
    this.props = { popupBankSetup, dispatch };

    this.value = popupBankSetup[this.stateName];
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.props.dispatch(
      changeData({ [this.stateName]: value }),
    );
  }
}
