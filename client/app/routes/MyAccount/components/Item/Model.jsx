import _ from 'lodash';
import { tabItemCate } from 'actions/mineActions';

import {
  CATEGORY_GOODS_ID,
  CATEGORY_SERVICE_ID,
  CATEGORY_SPACE_ID,
} from 'constants/enums';

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
  constructor(props, dispatch, dispatchFetchItem, dispatchReset) {
    const { items, itemsCateState } = props;
    this.itemsCateState = itemsCateState;
    this.items = this.collectItems(items);
    this.dispatch = dispatch;
    this.dispatchFetchItem = dispatchFetchItem;
    this.dispatchReset = dispatchReset;
    this.createPath = this.getCreatePath();
    this.tabCate = this.tabCate.bind(this);
    this.getIsActive = this.getIsActive.bind(this);
    this.setCategoryId(itemsCateState);
  }

  tabCate(category) {
    this.dispatch(tabItemCate(category));
    this.setCategoryId(category);
    this.fetchItems();
  }

  setCategoryId(category) {
    switch (category) {
      case 'goods':
        this.categoryID = CATEGORY_GOODS_ID;
        break;
      case 'service':
        this.categoryID = CATEGORY_SERVICE_ID;
        break;
      case 'space':
        this.categoryID = CATEGORY_SPACE_ID;
        break;
      default:
        this.categoryID = CATEGORY_GOODS_ID;
        break;
    }
  }
  fetchItems() {
    this.dispatchReset();
    this.dispatchFetchItem(this.categoryID);
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
