import React from 'react';
import PropTypes from 'prop-types';
import TitleIcon from 'react-icons/lib/md/add-circle';
import myPropTypes from 'propTypes';

import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';
import ItemList from 'components/ItemList';
import {
  CATEGORY_GOODS,
  CATEGORY_SERVICE,
  CATEGORY_SPACE,
} from 'constants/enums';

import Container from '../Container';
import ItemControlBar from '../ItemControlBar';
import Model from './Model';

class Items extends React.Component {
  static propTypes = {
    mine: myPropTypes.mine.isRequired,
    dispatch: PropTypes.func.isRequired,
    dispatchFetchItem: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
  };

  static renderNoDataText(category) {
    return {
      [CATEGORY_GOODS]: '尚未上架任何物品',
      [CATEGORY_SERVICE]: '尚未上架任何服務項目',
      [CATEGORY_SPACE]: '尚未上架任何物件',
    }[category];
  }

  componentDidMount() {
    // const { mine, dispatch } = this.props;
    this.props.dispatchReset();
    this.props.dispatchFetchItem('1');
    // new Model(mine, dispatch).fetchItems();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const { mine, dispatch, dispatchFetchItem, dispatchReset, myItem } = this.props;
    const mineModel = new Model(mine, dispatch, dispatchFetchItem, dispatchReset);

    if (!myItem) return null;

    const {
      isPaginable,
      isFetching,
      records,
    } = myItem;

    const { renderNoDataText } = this.constructor;
    const hasNoData = !isPaginable && !isFetching && records.length === 0;

    return (
      <Container icon={TitleIcon} titleText="發佈">
        <ItemControlBar
          tab={mineModel.tabCate}
          getIsActive={mineModel.getIsActive}
        />
        <ListContainer
          minHeight={500}
          noDataText={hasNoData ? renderNoDataText(mineModel.itemsCateState) : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          <PaginationContainer
            isPaginable={isPaginable}
            isFetching={isFetching}
            loadMore={() => { dispatchFetchItem(mineModel.categoryID); }}
          >
            <ItemList
              records={records}
              eachMargin={26}
            />
          </PaginationContainer>
        </ListContainer>
      </Container>
    );
  }
}

export default Items;
