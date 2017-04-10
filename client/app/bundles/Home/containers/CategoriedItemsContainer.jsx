import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Items from '../components/Items';
import Spinner from '../components/Spinner';
import { fetchCategories } from '../actions/itemsActions';

class CategoriedItemsContainer extends React.Component {

  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  getCurrentType() {
    const { items, params } = this.props;
    const { categories } = items;

    const flatten = {};
    Object.keys(categories).forEach((type) => {
      const mainCates = categories[type];
      // 第一層分類
      mainCates.forEach((mainCate) => {
        flatten[mainCate.id] = type;

        // 子分類
        if (mainCate.subcates) {
          mainCate.subcates.forEach((subcate) => {
            flatten[subcate.id] = type;
          });
        }
      });
    });
    return flatten[params.id];
  }

  render() {
    if (this.props.items.categories) {
      const currentType = this.getCurrentType();
      return <Items category={currentType} {...this.props} />;
    }
    return <Spinner height={500} />;
  }
}

const mapStateToProps = (state) => {
  const {
    environment,
    items,
  } = state;

  return ({
    environment,
    items,
  });
};
export default connect(mapStateToProps)(CategoriedItemsContainer);
