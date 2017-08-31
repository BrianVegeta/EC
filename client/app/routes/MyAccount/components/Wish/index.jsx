import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import WishList from 'components/WishList';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';
import Container from '../Container';

class WishListComponent extends React.Component {

  static propTypes = {
    myWish: PropTypes.shape({
      records: PropTypes.array,
    }).isRequired,
    dispatchFetchRecords: PropTypes.func.isRequired,
    dispatchShow: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.fetchSingleCard = this.fetchSingleCard.bind(this);
  }
  componentDidMount() {
    this.props.dispatchReset();
    this.props.dispatchFetchRecords();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  fetchSingleCard(id) {
    const { myWish } = this.props;
    const { records } = myWish;
    const card = find(records, { id });
    this.props.dispatchShow({ card });
  }

  render() {
    const { myWish, dispatchFetchRecords } = this.props;
    const {
      isPaginable,
      isFetching,
      records,
    } = myWish;

    const hasNoData = !isPaginable && !isFetching && records.length === 0;

    return (
      <Container titleText="許願紙條">
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
            <WishList
              editable
              onShow={this.fetchSingleCard}
              records={records}
            />
          </PaginationContainer>
        </ListContainer>
      </Container>
    );
  }
}

export default WishListComponent;
