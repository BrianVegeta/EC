import { connect } from 'react-redux';

import HomeTopMenu from 'components/HomeTopMenu';
import { findTopCategory } from 'lib/category';


/* pick props */
// const mapStateToProps = (
//   { environment, options: { categories } },
//   { params },
// ) => ({
//   environment,
//   topCategory: categories[findTopCategory(categoryID, categories)],
// });

const mapStateToProps = (
  { environment, options: { categories } },
  { params },
) => {
  const topCategory = params && params.cid && findTopCategory(params.cid, categories);
  return {
    environment,
    topCategory,
  };
};

export default connect(mapStateToProps)(HomeTopMenu);
