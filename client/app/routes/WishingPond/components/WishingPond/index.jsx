import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import { find } from 'lodash';
import { browserHistory } from 'react-router';
import { publishWishRouter } from 'lib/paths';
import WishList from 'components/WishList';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import FilterBarContainer, {
  FILTER_TYPE_WISH,
} from 'containers/FilterBar/Container';
import AddWish from 'components/Button/AddWish';
import IconWish from 'react-icons/lib/fa/magic';
import styles from './styles.sass';

class WishingPond extends React.Component {

  static propTypes = {
    wish: PropTypes.shape({
      isPaginable: PropTypes.bool.isRequired,
      isFetching: PropTypes.bool.isRequired,
      records: PropTypes.array.isRequired,
    }).isRequired,
    dispatchFetchRecords: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatchShow: PropTypes.func.isRequired,
  };

  static renderTitleIcon() {
    return <IconWish size={40} />;
  }

  constructor(props) {
    super(props);
    this.fetchSingleCard = this.fetchSingleCard.bind(this);
    this.refetch = this.refetch.bind(this);
  }

  componentDidMount() {
    this.refetch();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  refetch() {
    this.props.dispatchReset();
    this.props.dispatchFetchRecords();
  }

  fetchSingleCard(id) {
    const { wish } = this.props;
    const { records } = wish;
    const card = find(records, { id });
    this.props.dispatchShow({ card });
  }

  // <div styleName="title-container">
  //   <div styleName="title-icon">
  //     <IconTemp size={40} />
  //   </div>
  //   <span styleName="title">許願看板</span>
  //   <span styleName="title-hint">有需求卻找不到？快來許願吧！</span>
  // </div>
  // <div styleName="action-container">
  //   <button>篩選</button>
  //   <button>許願</button>
  // </div>
  render() {
    const { wish, dispatchFetchRecords } = this.props;
    const { renderTitleIcon } = this.constructor;

    const {
      isPaginable,
      isFetching,
      records,
    } = wish;

    const hasNoRecords = records.length === 0;
    const hasNoData = !isPaginable && !isFetching && hasNoRecords;

    return (
      <div>
        <PageHeader >
          <PageTitle
            title="許願看板"
            subtitle="有需求卻找不到？快來許願吧！"
            renderIcon={() => renderTitleIcon()}
          />
          <div styleName="action-container">
            <div styleName="action-filter-container">
            </div>
            <div styleName="action-filter-container">
              <AddWish
                onClick={() => browserHistory.push(publishWishRouter.indexPath(''))}
              />
            </div>
          </div>
          <FilterBarContainer
            refetch={this.refetch}
            filterType={FILTER_TYPE_WISH}
          />
        </PageHeader>
        <div className="clear">
          <ListContainer
            minHeight={500}
            noDataText={hasNoData ? '尚無任何許願紙條' : null}
            isInitialFetching={isFetching && hasNoRecords}
          >
            <PaginationContainer
              isPaginable={isPaginable}
              isFetching={isFetching}
              loadMore={dispatchFetchRecords}
            >
              <WishList
                records={records}
                editable={false}
                onShow={this.fetchSingleCard}
                shouldInitAnimate
              />
            </PaginationContainer>
          </ListContainer>
        </div>
      </div>
    );
  }
}

export default CSS(WishingPond, styles);
