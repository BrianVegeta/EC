import React from 'react';
import PropTypes from 'prop-types';

import WishList from 'components/WishList';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';

import Navigation from '../Navigation';

class WishListComponent extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
    userprofileWishList: PropTypes.shape({
      records: PropTypes.array,
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
    const { params, userprofileWishList, dispatchFetchRecords } = this.props;
    const {
      isPaginable,
      isFetching,
      records,
    } = userprofileWishList;

    const hasNoData = !isPaginable && !isFetching && records.length === 0;

    return (
      <div>
        <Navigation uid={params.uid} />
        <ListContainer
          minHeight={500}
          noDataText={hasNoData ? '尚無任何許願紙條' : null}
          isInitialFetching={isFetching && records.length === 0}
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

export default WishListComponent;
