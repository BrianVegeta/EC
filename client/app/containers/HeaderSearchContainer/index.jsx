import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from 'react-icons/lib/md/search';
import classnames from 'classnames/bind';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import {
  searchUserByName,
  searchItemByName,
  searchWishByName,
} from 'actions/searchActions';
import LoadingSpinner from 'components/Loading/MDSpinner';
import ButtonLoadMore from 'components/Button/LoadMore';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import SearchPanel from './components/SearchPanel';
import Collection from './components/Collection';
import Inputer from './components/Inputer';
import RowUser from './components/RowUser';
import RowItem from './components/RowItem';
import RowWish from './components/RowWish';
import Model from './Model';
import ModelRowUser from './Model/RowUser';
import ModelRowWish from './Model/RowWish';
import ModelRowItem from './Model/RowItem';
import myPropTypes from '../../propTypes';

const cx = classnames.bind(styles);
class Search extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    search: myPropTypes.search.isRequired,
  };

  static renderMoreButton(
    isPaginable,
    isCurrentPage,
    isFetching,
    fetchAction,
  ) {
    if (!isCurrentPage || !isPaginable || !fetchAction) return null;
    return (
      <div styleName="search-more-btn">
        <ButtonLoadMore isLoading={isFetching} onClick={fetchAction} />
      </div>
    );
  }

  constructor(props) {
    super(props);
    this.renderUserItem = this.renderUserItem.bind(this);
    this.renderWishItem = this.renderWishItem.bind(this);
    this.renderGoodsItem = this.renderGoodsItem.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onInputChange = debounce(
      this.onInputChange.bind(this),
      500,
      { leading: true },
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  onInputChange(name) {
    const { search, dispatch } = this.props;
    const model = new Model(search, dispatch);
    model.doSearch(name);
  }

  handleClickOutside(e) {
    if (this.searcher.contains(e.target)) return;
    const { search, dispatch } = this.props;
    const model = new Model(search, dispatch);
    model.closeResultPanel();
  }

  renderGoodsItem(item, index) {
    return (
      <RowItem
        key={`${index + 1}`}
        source={new ModelRowItem(item, this.props.dispatch)}
      />
    );
  }

  renderUserItem(user, index) {
    return (
      <RowUser
        key={`${index + 1}`}
        user={new ModelRowUser(user, this.props.dispatch)}
      />
    );
  }

  renderWishItem(wish, index) {
    return (
      <RowWish
        key={`${index + 1}`}
        source={new ModelRowWish(wish, this.props.dispatch)}
      />
    );
  }

  render() {
    const { search, dispatch } = this.props;
    const { renderMoreButton } = this.constructor;
    const model = new Model(search, dispatch);
    const {
      users,
      items,
      wishs,
      isUsersPaginating,
      isItemsPaginating,
      isWishsPaginating,
    } = model;
    const {
      isPaginable,
      isUserFetching,
      isItemFetching,
      isWishFetching,
      query,
    } = search;
    return (
      <div
        ref={searcher => (this.searcher = searcher)}
        styleName="container"
      >
        <Inputer
          placeholder="尋找你的好物、服務、空間、分享人名稱"
          onChange={this.onInputChange}
          setInputRect={model.setInputRect}
        />
        {model.isPanelShow &&
          <SearchPanel style={{ left: model.inputRect.left }}>
            {model.users &&
              <Collection
                headerText="用戶"
                seeAll={model.doSearchUser}
                isPaginating={isUsersPaginating}
                prev={model.prevSearch}
              >
                {users.map(this.renderUserItem)}
                {renderMoreButton(
                  isPaginable,
                  isUsersPaginating,
                  isUserFetching,
                  () => dispatch(searchUserByName(query, true)),
                )}
              </Collection>
            }
            {model.wishs &&
              <Collection
                headerText="許願紙條"
                seeAll={model.doSearchWish}
                isPaginating={model.isWishsPaginating}
                prev={model.prevSearch}
              >
                {wishs.map(this.renderWishItem)}
                {renderMoreButton(
                  isPaginable,
                  isWishsPaginating,
                  isWishFetching,
                  () => dispatch(searchWishByName(query, true)),
                )}
              </Collection>
            }
            {model.items &&
              <Collection
                headerText="物品"
                seeAll={model.doSearchItem}
                isPaginating={model.isItemsPaginating}
                prev={model.prevSearch}
              >
                {items.map((item, index) =>
                  (<RowItem
                    key={`${index + 1}`}
                    source={new ModelRowItem(item, dispatch)}
                  />),
                )}
                {renderMoreButton(
                  isPaginable,
                  isItemsPaginating,
                  isItemFetching,
                  () => dispatch(searchItemByName(query, true)),
                )}
              </Collection>
            }
            {model.shouldLoading &&
              <div styleName="loading">
                <LoadingSpinner />
              </div>
            }
            {model.isShowingNoResult &&
              <div styleName="noResult">
                <SearchIcon size={40} />
                <div className={cx('noResultText')} >搜尋沒有結果</div>
              </div>
            }
          </SearchPanel>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { search } = state;
  return ({ search });
};
export default connect(mapStateToProps)(CSS(Search, styles));
