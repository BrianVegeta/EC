import validate from 'validate.js';
import constraints from 'constraints';

import Text from 'models/Text';
import { changeData } from 'actions/popupBankSetupActions';

const COLUMN_NAME = 'realName';
export default class extends Text {
  constructor(props) {
    super(props);
    const { popupBankSetup } = this.props;
    this.value = popupBankSetup[COLUMN_NAME];
  }

  onChange(value) {
    this.props.dispatch(
      changeData({ [COLUMN_NAME]: value }),
    );
  }

  validator() {
    return validate.single(this.value, constraints[COLUMN_NAME]);
  }
}
