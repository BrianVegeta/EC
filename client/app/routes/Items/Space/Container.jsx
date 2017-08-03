import React from 'react';
import { connect } from 'react-redux';

import IconPublishSpace from 'components/Icons/Publish/Space';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import PageFilterBar from 'components/PageFilterBar';

import SidebarCategoriesContainer from 'containers/SidebarCategoriesContainer';
import CategoriedItemListContainer from 'containers/CategoriedItemList';
import {
  CATEGORY_SPACE,
  CATEGORY_SPACE_ID,
} from 'constants/enums';
import { mapCategoryNameByID } from 'lib/category';

class ItemsSpaceContainer extends React.Component {

  componentWillReceiveProps() {
    console.log('will receive props');
  }

  render() {
    const { items } = this.props;
    const { categoryID } = items;

    return (
      <div>
        <PageHeader >
          <PageTitle
            title={mapCategoryNameByID(categoryID)}
            renderIcon={() => <IconPublishSpace />}
          />
          <PageFilterBar />
        </PageHeader>
        <div className="clear">
          <SidebarCategoriesContainer topCategory={CATEGORY_SPACE} />
          <CategoriedItemListContainer categoryID={CATEGORY_SPACE_ID} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, items, options, routesHelper } = state;
  return { environment, items, options, routesHelper };
};
export default connect(mapStateToProps)(ItemsSpaceContainer);
