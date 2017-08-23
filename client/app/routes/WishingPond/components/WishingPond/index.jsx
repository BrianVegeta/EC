import React from 'react';
import PropTypes from 'prop-types';

import WishList from 'components/WishList';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';


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

    const hasNoData = !isPaginable && !isFetching && records.length === 0;

    return (
      <div>
        <ListContainer
          minHeight={500}
          noDataText={hasNoData ? '尚無任何許願紙條' : null}
          isInitialFetching={isFetching}
        >
          <PaginationContainer
            isPaginable={isPaginable}
            isFetching={isFetching}
            loadMore={dispatchFetchRecords}
          >
            <WishList records={records} />
          </PaginationContainer>
        </ListContainer>
      </div>
    );
  }
}

export default WishingPond;
