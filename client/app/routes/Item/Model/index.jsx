import { isStateInitial } from 'reducers/itemReducer';
import OrderBoard from './OrderBoard';

export default class {
  constructor(item, dispatch, currentUser) {
    this.exist = !isStateInitial(item);

    if (!this.exist) return;
    this.orderBoard = new OrderBoard(item, dispatch, currentUser);
  }
}
