import {
  changeState,
  checkPassword,
  createPassword,
} from 'actions/accessCheckActions';
import { NEW, CHECK } from 'constants/renderTypes/accessCheck';

export default class {
  constructor({ accessCheck, onChecked, dispatch }) {
    this.props = {
      accessCheck,
      onChecked,
      dispatch,
    };

    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onPasswordChange(value) {
    this.props.dispatch(
      changeState({ password: value }),
    );
  }

  onSubmit() {
    const { accessCheck, dispatch, onChecked } = this.props;
    const { renderType, password } = accessCheck;

    switch (renderType) {
      case NEW:
        dispatch(
          createPassword(
            password,
            () => onChecked(password),
          ),
        );
        break;
      case CHECK:
        dispatch(
          checkPassword(
            password,
            () => onChecked(password),
          ),
        );
        break;
      default:
        dispatch(
          createPassword(
            password,
            () => onChecked(password),
          ),
        );

    }
  }
}
