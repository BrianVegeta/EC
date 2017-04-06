import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FeatureBanner from '../components/FeatureBanner';
import Firelane from '../components/Firelane';
import ItemsFilter from '../components/ItemsFilter';
import SidebarCategories from '../components/SidebarCategories';
import ItemsList from '../components/ItemsList';
import ContentLayout from '../components/Items/ContentLayout';
import { fetchCategories, fetchItems } from '../actions/itemsActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
};

class GoodsContainer extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
    dispatch(fetchItems());
    console.log('mount');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { dispatch } = this.props;
      dispatch(fetchItems());
      console.log('get');
    }
  }

  currentType() {
    const { items, routeParams } = this.props;
    if (routeParams.type) {
      return routeParams.type;
    }
    if (items.categories.goods === undefined) {
      return false;
    }

    const routeCateId = parseInt(routeParams.id, 10);
    const flatten = {};
    ['goods', 'service', 'space'].forEach((type) => {
      items.categories[type].forEach((category) => {
        flatten[category.id] = type;
        const subcates = category.subcates || [];
        subcates.forEach((subcate) => {
          flatten[subcate.id] = type;
        });
      });
    });
    return flatten[routeCateId];
  }

  render() {
    const { items } = this.props;
    const sidebar = <SidebarCategories {...this.props} currentType={this.currentType()} />;
    return (
      <div>
        <div style={{ height: '130px' }} />
        <FeatureBanner />
        <Firelane distance={30} />
        <ItemsFilter />
        <Firelane distance={30} />
        <ContentLayout sidebar={sidebar} >
          {
            items.fetchingState === 'fetching' ?
              null :
              <ItemsList {...this.props} />
          }
        </ContentLayout>
      </div>
    );
  }
}

GoodsContainer.propTypes = propTypes;


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
export default connect(mapStateToProps)(GoodsContainer);
