import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Items from '../components/Items';
import Spinner from '../components/Spinner';
import FeatureHeader from '../components/Items/FeatureHeader';
import { fetchCategories } from '../actions/itemsActions';


const propTypes = {
  dispatch: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};
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

  currentTypeContent() {
    const { items, params } = this.props;
    const { categories } = items;

    const flatten = {};
    Object.keys(categories).forEach((type) => {
      const mainCates = categories[type];
      // 第一層分類
      mainCates.forEach((mainCate) => {
        flatten[mainCate.id] = {
          id: mainCate.id,
          link: mainCate.link,
          text: mainCate.text,
          hasIcon: true,
        };

        // 子分類
        if (mainCate.subcates) {
          mainCate.subcates.forEach((subcate) => {
            flatten[subcate.id] = {
              id: subcate.id,
              link: subcate.link,
              text: subcate.text,
              hasIcon: false,
            };
          });
        }
      });
    });
    return flatten[params.id];
  }

  render() {
    const { items } = this.props;
    if (items.categories) {
      const currentTypeContent = this.currentTypeContent();
      const featureHeader = (
        <FeatureHeader
          text={currentTypeContent.text}
          hasIcon={currentTypeContent.hasIcon}
        />
      );
      const currentType = this.getCurrentType();
      return (
        <Items
          featureHeader={featureHeader}
          currentType={currentType}
          {...this.props}
        />
      );
    }
    return <Spinner height={500} />;
  }
}
CategoriedItemsContainer.propTypes = propTypes;
const mapStateToProps = (state) => {
  const {
    environment,
    items,
    routesHelper,
  } = state;

  return ({
    environment,
    items,
    routesHelper,
  });
};
export default connect(mapStateToProps)(CategoriedItemsContainer);
