import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FeatureBanner from '../components/FeatureBanner';
import Firelane from '../components/Firelane';
import ItemsFilter from '../components/ItemsFilter';
import SidebarCategories from '../components/SidebarCategories';
import ItemsList from '../components/ItemsList';
import ContentLayout from '../components/Items/ContentLayout';
import { fetchItems } from '../actions/itemsActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class GoodsContainer extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchItems());
  }

  render() {
    const { items } = this.props;
    return (
      <div>
        <div style={{ height: '130px' }} />
        <FeatureBanner />
        <Firelane distance={30} />
        <ItemsFilter />
        <Firelane distance={30} />
        <ContentLayout sidebar={<SidebarCategories />} >
          {
            items.fetchingState === 'fetching' ?
              null :
              <ItemsList items={items.records} />
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
