import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IconPublishService from 'components/Icons/Publish/Service';
import PageHeader from 'components/PageHeader';
import PageTitle from 'components/PageTitle';
import PageFilterBar from 'components/PageFilterBar';

import SidebarCategoriesContainer from 'containers/SidebarCategoriesContainer';
import CategoriedItemListContainer from 'containers/CategoriedItemList';

import { mapCategoryNameByID } from 'lib/category';

class CategoriedContainer extends React.Component {

  static propTypes = {
    items: PropTypes.shape({
      categoryID: PropTypes.string.isRequired,
    }).isRequired,
    options: PropTypes.shape({
      categories: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    const { items, options } = this.props;
    const { categoryID } = items;
    const { categories } = options;
    if (!categoryID) return null;
    return (
      <div>
        <PageHeader >
          <PageTitle
            title={mapCategoryNameByID(categoryID, categories)}
            renderIcon={() => <IconPublishService />}
          />
          <PageFilterBar />
        </PageHeader>
        <div className="clear">
          <SidebarCategoriesContainer categoryID={categoryID} />
          <CategoriedItemListContainer categoryID={categoryID} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, items, options } = state;
  return { environment, items, options };
};
export default connect(mapStateToProps)(CategoriedContainer);
