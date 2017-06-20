import _ from 'lodash';
import {
  searchByName,
  updateQuery,
} from '../../../../actions/searchActions';

class Search {
  constructor(props) {
    const { dispatch, search } = props;
    this.dispatch = dispatch;
    this.query = search.query;
    this.doSearch = this.doSearch.bind(this);

    this.isUserFetching = search.isUserFetching;
    this.isItemFetching = search.isItemFetching;
    this.isWishFetching = search.isWishFetching;
    this.isFetching = this.isFetching();
  }
  isFetching() {
    return this.isUserFetching || this.isItemFetching || this.isWishFetching;
  }
  doSearch(name) {
    const checkedName = name.replace(/[^\u4e00-\u9fa5_a-zA-Z0-9]{0,50}/g, '');
    if (_.isEmpty(checkedName)) {
      return;
    }
    if (!this.isFetching) {
      this.dispatch(searchByName(checkedName));
    }
  }
}
export default Search;
