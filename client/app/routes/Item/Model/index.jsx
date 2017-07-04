import _ from 'lodash';
import OrderBoard from './OrderBoard';

export default class {
  constructor(item, dispatch, currentUser) {
    const { detail } = item;
    this.exist = !_.isEmpty(detail);
    if (!this.exist) return;
    this.orderBoard = new OrderBoard(detail, dispatch, currentUser);
  }
}
