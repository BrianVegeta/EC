import React from 'react';
import PropTypes from 'prop-types';
// import { findTopCategory } from 'lib/category';
import IconService from 'components/Icons/Publish/Service';
import IconGoods from 'components/Icons/Publish/Goods';
import IconSpace from 'components/Icons/Publish/Space';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import ListContainer from 'components/ListContainer';
import PaginationContainer from 'components/PaginationContainer';
import ItemList from 'components/ItemList';
import FilterBarContainer from 'containers/FilterBar/Container';
import {
  CATEGORY_GOODS_ID,
  CATEGORY_SERVICE_ID,
  CATEGORY_SPACE_ID,
} from 'constants/enums';

import SidebarCategoriesContainer from 'containers/SidebarCategoriesContainer';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class Items extends React.Component {

  static defaultProps = {
    topCategoryID: null,
  };

  static propTypes = {
    dispatchFetchRecords: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    categoryID: PropTypes.string.isRequired,
    topCategoryID: PropTypes.string,
    categoryName: PropTypes.string.isRequired,
    items: PropTypes.shape({
      records: PropTypes.array,
    }).isRequired,
    filterType: PropTypes.string.isRequired,
  };

  static renderTitleIcon(categoryID) {
    switch (categoryID) {
      case CATEGORY_GOODS_ID: return <IconService />;
      case CATEGORY_SERVICE_ID: return <IconGoods />;
      case CATEGORY_SPACE_ID: return <IconSpace />;
      default: return null;
    }
  }

  static renderNoDataText(id) {
    switch (id) {
      case CATEGORY_GOODS_ID: return '尚無此類物品';
      case CATEGORY_SERVICE_ID: return '尚無此類服務項目';
      case CATEGORY_SPACE_ID: return '尚無此類物件';
      default: return '';
    }
  }

  constructor(props) {
    super(props);
    this.refetch = this.refetch.bind(this);
  }

  componentDidMount() {
    this.refetch();
  }

  componentDidUpdate(prevProps) {
    if (this.props.categoryID !== prevProps.categoryID) {
      this.refetch();
    }
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  refetch() {
    this.props.dispatchReset();
    this.props.dispatchFetchRecords();
  }

  render() {
    const {
      categoryName,
      categoryID,
      topCategoryID,
      items,
      dispatchFetchRecords,
      filterType,
    } = this.props;

    const {
      isPaginable,
      isFetching,
      records,
    } = items;

    const { renderTitleIcon, renderNoDataText } = this.constructor;
    const hasNoData = !isPaginable && !isFetching && records.length === 0;
    const noDataText = renderNoDataText(topCategoryID || categoryID);
    return (
      <div styleName="container">
        <PageHeader >
          <PageTitle
            title={categoryName}
            renderIcon={() => renderTitleIcon(categoryID)}
          />
          <FilterBarContainer
            refetch={this.refetch}
            filterType={filterType}
          />
        </PageHeader>
        <div className="clear">
          <SidebarCategoriesContainer categoryID={categoryID} />
          <div style={{ marginLeft: 279 }} styleName="items-container">
            <ListContainer
              minHeight={500}
              noDataText={hasNoData ? noDataText : null}
              isInitialFetching={isFetching && records.length === 0}
            >
              <PaginationContainer
                isPaginable={isPaginable}
                isFetching={isFetching}
                loadMore={dispatchFetchRecords}
              >
                <ItemList
                  records={records}
                  eachMargin={26}
                />
              </PaginationContainer>
            </ListContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(Items, styles);
