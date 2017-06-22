import React from 'react';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';
import SearchIcon from 'react-icons/lib/md/search';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import SearchPanel from './components/SearchPanel';
import Collection from './components/Collection';
import Inputer from './components/Inputer';
import RowUser from './components/RowUser';
import RowItem from './components/RowItem';
import Model from './Model';
import ModelRowUser from './Model/RowUser';
import ModelRowWish from './Model/RowWish';
import ModelRowItem from './Model/RowItem';

const cx = classnames.bind(styles);
class Search extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  // componentDidMount() {
  //   const model = new Model(this.props);
  //   const appNode = document.querySelectorAll('[id^="App-react-component-"]')[0];
  //   appNode.addEventListener('click', model.closeResultPanel);
  // }
  render() {
    const { dispatch } = this.props;
    const model = new Model(this.props);
    const { users, items, wishs } = model;
    return (
      <div styleName="container">
        <Inputer
          placeholder="尋找你的好物、服務、空間、分享人名稱"
          onChange={model.doSearch}
          setInputRect={model.setInputRect}
        />
        {model.isPanelShow &&
          <SearchPanel style={{ left: model.inputRect.left }}>
            {model.users &&
              <Collection
                headerText="用戶"
                seeAll={model.doSearchUser}
                isPaginating={model.isUsersPaginating}
                prev={model.prevSearch}
              >
                {users.map((user, index) =>
                  <RowUser
                    key={`${index + 1}`}
                    user={new ModelRowUser(user, dispatch)}
                  />,
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
                {wishs.map((wish, index) =>
                  <RowItem
                    key={`${index + 1}`}
                    source={new ModelRowWish(wish, dispatch)}
                  />,
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
                  <RowItem
                    key={`${index + 1}`}
                    source={new ModelRowItem(item, dispatch)}
                  />,
                )}
              </Collection>
            }
            {model.shouldLoading &&
              <div className={cx('loading')}>
                <MDSpinner
                  style={{ width: 30 }}
                  color1="#31ABBA"
                  color2="#FF9442"
                />
              </div>
            }
            {model.isShowingNoResult &&
              <div className={cx('noResult')}>
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
export default CSS(Search, styles);
