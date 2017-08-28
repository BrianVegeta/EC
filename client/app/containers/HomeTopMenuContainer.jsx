import { connect } from 'react-redux';

import HomeTopMenu from 'components/HomeTopMenu';
import { findTopCategory } from 'lib/category';


const mapStateToProps = (
  { environment, categories },
  { params },
) => {
  const topCategory = params && params.cid && findTopCategory(params.cid, categories);
  return {
    environment,
    topCategory,
  };
};

export default connect(mapStateToProps)(HomeTopMenu);
