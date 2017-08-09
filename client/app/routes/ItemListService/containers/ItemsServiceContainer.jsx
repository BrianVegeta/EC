import React from 'react';
import { connect } from 'react-redux';

import IconPublishService from 'components/Icons/Publish/Service';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import PageFilterBar from 'components/PageFilterBar';

import SidebarCategoriesContainer from 'containers/SidebarCategoriesContainer';
import CategoriedItemListContainer from 'containers/CategoriedItemList';
import { CATEGORY_SERVICE_ID } from 'constants/enums';
import { mapCategoryNameByID } from 'lib/category';

class ItemsServiceContainer extends React.Component {
  render() {
    return (
      <div>
        <PageHeader >
          <PageTitle
            title={mapCategoryNameByID(CATEGORY_SERVICE_ID)}
            renderIcon={() => <IconPublishService />}
          />
          <PageFilterBar />
        </PageHeader>
        <div className="clear">
          <SidebarCategoriesContainer categoryID={CATEGORY_SERVICE_ID} />
          <CategoriedItemListContainer categoryID={CATEGORY_SERVICE_ID} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment } = state;
  return { environment };
};
export default connect(mapStateToProps)(ItemsServiceContainer);
