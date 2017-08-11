import React from 'react';
import PropTypes from 'prop-types';

import Container from '../Container';

import ListContainer from 'components/ListContainer';
import ItemList from 'components/ItemList';

class Collections extends React.Component {

  static propTypes = {
    myCollections: PropTypes.shape({
      collections: PropTypes.array.isRequired,
    }).isRequired,
    dispatchFetchItem: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatchReset();
    this.props.dispatchFetchItem();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const { myCollections } = this.props;
    const { records } = myCollections
    return (
      <Container titleText={'收藏'}>
        <ListContainer
          minHeight={500}
          noDataText={(records.length === 0) ? '沒有收藏' : null }
          isInitialFetching={myCollections.isFetching && records.length === 0}
        >
          <ItemList
            records={records}
            eachMargin={26}
          />
        </ListContainer>
      </Container>
    );
  }
}
export default Collections;
