import _ from 'lodash';
import { fetchItems, tabItemCate } from '../../../actions/mineActions';

export default class {
  static matchCategory(category, categoryPath) {
    switch (category) {
      case 'goods':
        return /^\/1\//.test(categoryPath);
      case 'service':
        return /^\/2\//.test(categoryPath);
      case 'space':
        return /^\/3\//.test(categoryPath);
      default:
        return /^\/1\//.test(categoryPath);
    }
  }
  constructor(props, dispatch) {
    const { items, itemsCateState } = props;
    this.itemsCateState = itemsCateState;
    this.items = this.collectItems(items);
    this.dispatch = dispatch;
    this.createPath = this.getCreatePath();
    this.tabCate = this.tabCate.bind(this);
    this.getIsActive = this.getIsActive.bind(this);
  }
  tabCate(category) {
    this.dispatch(tabItemCate(category));
  }
  fetchItems() {
    this.dispatch(fetchItems());
  }
  getIsActive(cate) {
    return this.itemsCateState === cate;
  }
  getCreatePath() {
    switch (this.itemsCateState) {
      case 'goods':
        return '/p/release-goods';
      case 'service':
        return '/p/release-service';
      default:
        return '/p/release-space';
    }
  }
  collectItems(items) {
    return _.filter(
      items,
      item => this.constructor.matchCategory(this.itemsCateState, item.category_path),
    );
  }
}
