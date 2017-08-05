import React from 'react';
import { connect } from 'react-redux';

import IconPublishSpace from 'components/Icons/Publish/Space';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import PageFilterBar from 'components/PageFilterBar';

import SidebarCategoriesContainer from 'containers/SidebarCategoriesContainer';
import CategoriedItemListContainer from 'containers/CategoriedItemList';
import { CATEGORY_SPACE_ID } from 'constants/enums';
import { mapCategoryNameByID } from 'lib/category';

class ItemsSpaceContainer extends React.Component {

  render() {
    return (
      <div>
        <PageHeader >
          <PageTitle
            title={mapCategoryNameByID(CATEGORY_SPACE_ID)}
            renderIcon={() => <IconPublishSpace />}
          />
          <PageFilterBar />
        </PageHeader>
        <div className="clear">
          <SidebarCategoriesContainer categoryID={CATEGORY_SPACE_ID} />
          <CategoriedItemListContainer categoryID={CATEGORY_SPACE_ID} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment } = state;
  return { environment };
};
export default connect(mapStateToProps)(ItemsSpaceContainer);
