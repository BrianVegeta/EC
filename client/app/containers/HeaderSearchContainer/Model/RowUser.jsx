import _ from 'lodash';
// import {
//   searchByName,
// } from '../../../actions/searchActions';

export default class {
  static handleNullAtrr(attr) {
    return _.isNull(attr) || _.isEqual(attr, '') || _.isUndefined(attr) ? '' : attr;
  }
  constructor(user, dispatch) {
    this.dispatch = dispatch;
    this.username = user.name;
    const { handleNullAtrr } = this.constructor;
    this.addresses = `${handleNullAtrr(user.city)}${handleNullAtrr(user.area)}`;
    this.avatar = handleNullAtrr(user.picture);
    this.avatarBg = _.isEqual(this.avatar, '') ? null : this.avatar;
  }
}
