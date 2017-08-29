import React from 'react';
import PropTypes from 'prop-types';
import TitleIcon from 'react-icons/lib/md/add-circle';

import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';
import ItemList, { CONTROL_TYPE_PRIVATE } from 'components/ItemList';
import { CATEGORY_SPACE } from 'constants/enums';
import ItemControlBar from './ItemControlBar';
import Container from '../Container';

class Space extends React.Component {

  static propTypes = {
    myItem: PropTypes.shape({
      isPaginable: PropTypes.bool.isRequired,
      isFetching: PropTypes.bool.isRequired,
      records: PropTypes.array.isRequired,
    }).isRequired,
    dispatchFetchItem: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatchDelete: PropTypes.func.isRequired,
  };


  componentDidMount() {
    this.props.dispatchReset();
    this.props.dispatchFetchItem();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const { myItem, dispatchDelete, dispatchFetchItem } = this.props;

    if (!myItem) return null;
    const {
      isPaginable,
      isFetching,
      records,
    } = myItem;

    const hasNoData = !isPaginable && !isFetching && records.length === 0;

    return (
      <Container icon={TitleIcon} titleText="發佈">
        <ItemControlBar
          getIsActive={CATEGORY_SPACE}
        />
        <ListContainer
          minHeight={500}
          noDataText={hasNoData ? '尚未上架任何服務項目' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          <PaginationContainer
            isPaginable={isPaginable}
            isFetching={isFetching}
            loadMore={() => { dispatchFetchItem(); }}
          >
            <ItemList
              records={records}
              type={CONTROL_TYPE_PRIVATE}
              onDelete={dispatchDelete}
              eachMargin={26}
            />
          </PaginationContainer>
        </ListContainer>
      </Container>
    );
  }
}

export default Space;
