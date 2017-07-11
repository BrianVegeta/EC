import Modal from 'components/modals/Modal';
import { openModal } from 'actions/modalActions';

export default class {
  constructor(props, dispatch) {
    this.dispatch = dispatch;
    this.setup = this.setup.bind(this);
  }

  setup() {
    this.dispatch(openModal(Modal, { test: 1 }));
  }
}
