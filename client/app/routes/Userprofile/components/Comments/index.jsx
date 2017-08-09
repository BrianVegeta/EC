import React from 'react';
import PropTypes from 'prop-types';

import CommentNote from 'components/CommentNote';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';

import Navigation from '../Navigation';

class Comments extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
    userprofileComments: PropTypes.shape({
      records: PropTypes.array,
    }).isRequired,
    dispatchRecords: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatchRecords();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const { params, userprofileComments, dispatchRecords } = this.props;
    const {
      isPaginable,
      isFetching,
      records,
    } = userprofileComments;

    const hasNoData = !isPaginable && !isFetching && records.length === 0;

    return (
      <div>
        <Navigation uid={params.uid} />
        <ListContainer
          minHeight={500}
          noDataText={hasNoData ? '尚無任何評價' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          <PaginationContainer
            isPaginable={isPaginable}
            isFetching={isFetching}
            loadMore={dispatchRecords}
          >
            {records.map((record, index) => (
              <CommentNote
                key={`${index + 1}`}
                data={record}
              />
            ))}
          </PaginationContainer>
        </ListContainer>
      </div>
    );
  }
}

export default Comments;
