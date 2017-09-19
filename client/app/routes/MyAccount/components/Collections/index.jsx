import React from 'react';
import PropTypes from 'prop-types';
import ListContainer from 'components/ListContainer';
import ItemList from 'components/ItemList';

import { CONTROL_TYPE_PRIVATE_COLLECTION } from 'components/ItemBoard';

import Container from '../Container';

class Collections extends React.Component {

  static propTypes = {
    // myCollections: PropTypes.shape({
    //  collections: PropTypes.array.isRequired,
    // }).isRequired,
    myCollections: PropTypes.shape({
      isFetching: PropTypes.bool,
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
    if (myCollections == null) {
      return null;
    }
    const { records } = myCollections;
    return (
      <Container titleText={'收藏'}>
        <ListContainer
          minHeight={500}
          noDataText={(records.length === 0) ? '目前沒有優收藏' : null}
          isInitialFetching={myCollections.isFetching && records.length === 0}
        >
          <ItemList
            type={CONTROL_TYPE_PRIVATE_COLLECTION}
            onDelete={() => { this.componentDidMount(); }}
            records={records}
            eachMargin={26}
          />
        </ListContainer>
      </Container>
    );
  }
}
export default Collections;
