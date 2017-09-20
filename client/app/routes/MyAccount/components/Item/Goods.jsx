import React from 'react';
import PropTypes from 'prop-types';
import TitleIcon from 'react-icons/lib/md/add-circle';
import AcccountNav from 'constants/myAccountNavs';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';
import ItemList, { CONTROL_TYPE_PRIVATE } from 'components/ItemList';
import { CATEGORY_GOODS } from 'constants/enums';
import ItemControlBar from './ItemControlBar';
import Container from '../Container';

const titleName = AcccountNav.items.text;
class Goods extends React.Component {

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
    // const { mine, dispatch } = this.props;
    this.props.dispatchReset();
    this.props.dispatchFetchItem();
    // new Model(mine, dispatch).fetchItems();
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
      <Container icon={TitleIcon} titleText={titleName}>
        <ItemControlBar
          getIsActive={CATEGORY_GOODS}
        />
        <ListContainer
          minHeight={500}
          noDataText={hasNoData ? '尚未上架任何物品' : null}
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

export default Goods;
