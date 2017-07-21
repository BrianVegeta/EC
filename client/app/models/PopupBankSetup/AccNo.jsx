import { changeData } from 'actions/popupBankSetupActions';

const COLUMN_NAME = 'accNo';
export default class {
  constructor(props) {
    const { popupBankSetup, dispatch } = props;
    this.props = { popupBankSetup, dispatch };

    this.value = popupBankSetup[COLUMN_NAME];
  }

  onChange(value) {
    this.props.dispatch(
      changeData({ [COLUMN_NAME]: value }),
    );
  }
}
