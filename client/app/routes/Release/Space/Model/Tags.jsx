import _ from 'lodash';
import { updateTags } from '../../../../actions/publishActions';

class Tags {
  constructor(hashtags, dispatch) {
    this.hashtags = hashtags;
    this.dispatch = dispatch;
    this.validator = this.validator.bind(this);
    this.update = this.update.bind(this);
  }
  update(hashtags) {
    this.dispatch(updateTags(hashtags));
  }
  validator() {
    if (_.isEmpty(_.compact(this.hashtags))) {
      return ['至少填一個標籤'];
    }
    return [];
  }
  isValid() {
    return _.isEmpty(this.validator());
  }
  existHashtags() {
    return _.filter(this.hashtags, tag => !_.isNull(tag)).value();
  }
}
export default Tags;
