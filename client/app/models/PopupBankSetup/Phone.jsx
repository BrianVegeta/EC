import { changeData } from 'actions/popupBankSetupActions';

const COLUMN_NAME = 'phone';
export default class {
  constructor({ popupBankSetup, dispatch }) {
    this.props = { popupBankSetup, dispatch };

    this.value = popupBankSetup[COLUMN_NAME];
  }

  onChange(value) {
    this.props.dispatch(
      changeData({ [COLUMN_NAME]: value }),
    );
  }
}
