import React from 'react';
import PropTypes from 'prop-types';

import WishList from 'components/WishList';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';

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
  };

  componentDidMount() {
    this.props.dispatchReset();
    this.props.dispatchFetchRecords();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const { wish, dispatchFetchRecords } = this.props;
    const {
      isPaginable,
      isFetching,
      records,
    } = wish;

    const hasNoRecords = records.length === 0;
    const hasNoData = !isPaginable && !isFetching && hasNoRecords;

    return (
      <div>
        <div>
          <span>許願看板</span>
          <span>有需求卻找不到？快來許願吧！</span>
        </div>
        <div>
          <button>塞選</button>
          <button>許願</button>
        </div>
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
              shouldInitAnimate
            />
          </PaginationContainer>
        </ListContainer>
      </div>
    );
  }
}

export default WishingPond;
