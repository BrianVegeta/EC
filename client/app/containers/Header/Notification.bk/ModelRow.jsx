import moment from 'moment';

export default class {
  constructor(item, dispatch) {
    this.title = 'Title';
    const contentJson = JSON.parse(item.content);
    this.description = contentJson.content;
    this.created = moment(item.create_time).format('YYYY/MM/DD');
    this.dispatch = dispatch;
  }
}
