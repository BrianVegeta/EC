import { isStateInitial } from '../../modules/item';

export default class {
  constructor(item, dispatch, currentUser) {
    this.exist = !isStateInitial(item);

    if (!this.exist) return;
  }
}
