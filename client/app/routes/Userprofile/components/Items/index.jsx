import React from 'react';
import PropTypes from 'prop-types';

import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';
import ItemList from 'components/ItemList';
import {
  CATEGORY_GOODS,
  CATEGORY_SERVICE,
  CATEGORY_SPACE,
} from 'constants/enums';

import Navigation from '../Navigation';


class Items extends React.Component {

  static defaultProps = {
    userprofileItems: null,
  };

  static propTypes = {
    dispatchReset: PropTypes.func.isRequired,
    dispatchFetchItems: PropTypes.func.isRequired,
    userprofileItems: PropTypes.shape({
      records: PropTypes.array.isRequired,
    }),
    category: PropTypes.oneOf([
      CATEGORY_GOODS, CATEGORY_SERVICE, CATEGORY_SPACE,
    ]).isRequired,
    params: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
  };

  static renderNoDataText(category) {
    return {
      [CATEGORY_GOODS]: '尚未上架任何物品',
      [CATEGORY_SERVICE]: '尚未上架任何服務項目',
      [CATEGORY_SPACE]: '尚未上架任何物件',
    }[category];
  }

  componentDidMount() {
    this.props.dispatchReset();
    this.props.dispatchFetchItems();
  }

  render() {
    const { userprofileItems, dispatchFetchItems, category, params } = this.props;

    if (!userprofileItems) return null;

    const {
      isPaginable,
      isFetching,
      records,
    } = userprofileItems;

    const { renderNoDataText } = this.constructor;
    const hasNoData = !isPaginable && !isFetching && records.length === 0;

    return (
      <div>
        <Navigation uid={params.uid} />
        <ListContainer
          minHeight={500}
          noDataText={hasNoData ? renderNoDataText(category) : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          <PaginationContainer
            isPaginable={isPaginable}
            isFetching={isFetching}
            loadMore={dispatchFetchItems}
          >
            <ItemList
              records={userprofileItems.records}
              eachMargin={26}
            />
          </PaginationContainer>
        </ListContainer>
      </div>
    );
  }
}

export default Items;
