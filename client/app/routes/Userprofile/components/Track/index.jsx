import React from 'react';
import PropTypes from 'prop-types';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';

import Navigation from '../TrackNavigation';
import TrackList from '../TrackList';

class TrackComponent extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
    userprofileTrack: PropTypes.shape({
      isFetching: PropTypes.bool,
      isPaginable: PropTypes.bool,
    }).isRequired,
    dispatchFetchRecords: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.dispatchReset();
    this.props.dispatchFetchRecords();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }


  render() {
    const { params, dispatchFetchRecords, userprofileTrack, type } = this.props;

    const {
      records,
      isFetching,
      isPaginable,
    } = userprofileTrack;

    const hasNoData = !isPaginable && !isFetching && records.length === 0;

    return (
      <div>
        <Navigation uid={params.uid} />
        <ListContainer
          minHeight={500}
          noDataText={hasNoData ? '沒有資料' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          <PaginationContainer
            isPaginable={isPaginable}
            isFetching={isFetching}
            loadMore={dispatchFetchRecords}
          >
            <TrackList
              records={records}
              type={type}
            />
          </PaginationContainer>
        </ListContainer>
      </div>
    );
  }
}

export default TrackComponent;
