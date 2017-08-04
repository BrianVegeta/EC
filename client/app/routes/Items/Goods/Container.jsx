import React from 'react';
import { connect } from 'react-redux';

import IconPublishService from 'components/Icons/Publish/Service';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import PageFilterBar from 'components/PageFilterBar';

import SidebarCategoriesContainer from 'containers/SidebarCategoriesContainer';
import CategoriedItemListContainer from 'containers/CategoriedItemList';
import {
  CATEGORY_GOODS,
  CATEGORY_GOODS_ID,
} from 'constants/enums';
import { mapCategoryNameByID } from 'lib/category';

class ItemsGoodsContainer extends React.Component {

  componentWillReceiveProps() {
    console.log('will receive props');
  }

  render() {
    const { items } = this.props;
    const { categoryID } = items;
    console.log(this.props);
    return (
      <div>
        <PageHeader >
          <PageTitle
            title={mapCategoryNameByID(categoryID)}
            renderIcon={() => <IconPublishService />}
          />
          <PageFilterBar />
        </PageHeader>
        <div className="clear">
          <SidebarCategoriesContainer topCategory={CATEGORY_GOODS} />
          <CategoriedItemListContainer categoryID={CATEGORY_GOODS_ID} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, items, options, routesHelper } = state;
  return { environment, items, options, routesHelper };
};
export default connect(mapStateToProps)(ItemsGoodsContainer);