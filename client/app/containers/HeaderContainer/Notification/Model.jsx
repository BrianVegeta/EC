import { getNotitications } from '../../../actions/notificationActions';

export default class {
  constructor(props, dispatch) {
    const {
      boxItems,
    } = props;
    console.log(boxItems);
    this.boxItems = boxItems;
    this.dispatch = dispatch;
    this.getNotitications = this.getNotitications.bind(this);
  }
  getNotitications() {
    this.dispatch(getNotitications());
  }
}
