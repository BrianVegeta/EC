import React from 'react';
import { connect } from 'react-redux';

import IconPublishService from 'components/Icons/Publish/Service';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import PageFilterBar from 'components/PageFilterBar';

import SidebarCategoriesContainer from 'containers/SidebarCategoriesContainer';
import CategoriedItemListContainer from 'containers/CategoriedItemList';

import { mapCategoryNameByID, findTopCategory } from 'lib/category';

class CategoriedContainer extends React.Component {


  render() {

      const { items, options } = this.props;

      console.log(findTopCategory(items.categoryID, options.categories));
      return (
        <div>
          <PageHeader >
            <PageTitle
              title={ mapCategoryNameByID(items.categoryID, options.categories)}
              renderIcon={() => <IconPublishService />}
            />
            <PageFilterBar />
          </PageHeader>
          <div className="clear">
            <SidebarCategoriesContainer topCategory={findTopCategory(items.categoryID, options.categories)} />
            <CategoriedItemListContainer categoryID={items.categoryID} />
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
    const { environment, items, options, routesHelper } = state;
    return { environment, items, options, routesHelper };
};
export default connect(mapStateToProps)(CategoriedContainer);
