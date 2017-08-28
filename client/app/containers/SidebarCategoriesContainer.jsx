import { connect } from 'react-redux';

import SidebarCategories from 'components/SidebarCategories';
import { findTopCategory } from 'lib/category';


/* pick props */
const mapStateToProps = (
  { environment, categories },
  { categoryID },
) => ({
  environment,
  categories: categories[findTopCategory(categoryID, categories)],
  categoryID,
});

export default connect(mapStateToProps)(SidebarCategories);
