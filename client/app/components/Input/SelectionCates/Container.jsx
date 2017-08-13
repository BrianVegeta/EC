import { connect } from 'react-redux';
import { fetchCategories } from 'modules/categories';

import Compnent from './index';

/* pick props */
const mapStateToProps = ({ environment, categories }, { topCategory }) => ({
  environment, categories: categories[topCategory],
});

/* pick dispatch */
const mapDispatchToProps = dispatch => ({
  dispatchFetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Compnent);
