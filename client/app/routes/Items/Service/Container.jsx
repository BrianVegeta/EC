import React from 'react';
import { connect } from 'react-redux';

import IconPublishService from 'components/Icons/Publish/Service';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import PageFilterBar from 'components/PageFilterBar';

import SidebarCategoriesContainer from 'containers/SidebarCategoriesContainer';
import {
  CATEGORY_SERVICE,
} from 'constants/enums';
import { mapCategoryNameByID } from 'lib/category';

class ItemsServiceContainer extends React.Component {

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
            renderIcon={() => <IconPublishService />}
          />
          <PageFilterBar />
        </PageHeader>
        <SidebarCategoriesContainer
          topCategory={CATEGORY_SERVICE}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, items, options, routesHelper } = state;
  return { environment, items, options, routesHelper };
};
export default connect(mapStateToProps)(ItemsServiceContainer);
