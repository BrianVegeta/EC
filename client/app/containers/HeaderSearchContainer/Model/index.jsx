import _ from 'lodash';
import {
  searchByName,
  searchUserByName,
  searchItemByName,
  searchWishByName,
  setInputRect,
  updateQuery,
  clearMulti,
  closeResultPanel,
} from '../../../actions/searchActions';

class Search {
  static handleNoResults(result) {
    return _.isNull(result) || _.isEmpty(result) ? null : result;
  }
  static filterCharacter(string) {
    return string.replace(/[^\u4e00-\u9fa5_a-zA-Z0-9]{0,50}/g, '');
  }
  constructor(search, dispatch, forceClose) {
    this.dispatch = dispatch;
    const {
      query,
      users, items, wishs,
      inputRect,
      isUserFetching, isItemFetching, isWishFetching, isMultiFetching,
      isPanelOpen,
      shouldLoading,
      paginating,
    } = search;

    const { handleNoResults } = this.constructor;
    this.query = query;
    this.users = handleNoResults(users);
    this.items = handleNoResults(items);
    this.wishs = handleNoResults(wishs);
    this.inputRect = inputRect;
    this.shouldLoading = shouldLoading;

    this.isUserFetching = isUserFetching;
    this.isItemFetching = isItemFetching;
    this.isWishFetching = isWishFetching;
    this.isMultiFetching = isMultiFetching;

    this.isPanelOpen = isPanelOpen;
    this.isPanelShow = !_.isEqual(this.query, '') && this.isPanelOpen && !forceClose;
    this.isShowingNoResult = this.isShowingNoResult();

    this.doSearch = this.doSearch.bind(this);
    this.doSearchUser = this.doSearchUser.bind(this);
    this.doSearchItem = this.doSearchItem.bind(this);
    this.doSearchWish = this.doSearchWish.bind(this);
    this.prevSearch = this.prevSearch.bind(this);
    this.setInputRect = this.setInputRect.bind(this);
    this.closeResultPanel = this.closeResultPanel.bind(this);

    this.isUsersPaginating = (paginating === 'users');
    this.isItemsPaginating = (paginating === 'items');
    this.isWishsPaginating = (paginating === 'wishs');
  }
  isShowingNoResult() {
    return !this.wishs && !this.users && !this.items && !this.shouldLoading;
  }
  doSearch(name) {
    this.dispatch(updateQuery(name));
    const checkedName = this.constructor.filterCharacter(name);
    if (_.isEqual(checkedName, '')) {
      this.dispatch(clearMulti());
      return;
    }
    if (!this.isFetching) {
      this.dispatch(searchByName(checkedName));
    }
  }
  prevSearch() {
    const checkedName = this.constructor.filterCharacter(this.query);
    if (_.isEqual(checkedName, '')) {
      this.dispatch(clearMulti());
      return;
    }
    if (!this.isFetching) {
      this.dispatch(searchByName(checkedName));
    }
  }
  doSearchUser() {
    const checkedName = this.constructor.filterCharacter(this.query);
    this.dispatch(searchUserByName(checkedName));
  }
  doSearchItem() {
    const checkedName = this.constructor.filterCharacter(this.query);
    this.dispatch(searchItemByName(checkedName));
  }
  doSearchWish() {
    const checkedName = this.constructor.filterCharacter(this.query);
    this.dispatch(searchWishByName(checkedName));
  }
  setInputRect(rect) {
    this.dispatch(setInputRect(rect));
  }
  closeResultPanel() {
    this.dispatch(closeResultPanel());
  }
}
export default Search;
