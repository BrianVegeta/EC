import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FeatureBanner from '../components/FeatureBanner';
import Firelane from '../components/Firelane';
import ItemsFilter from '../components/ItemsFilter';
import SidebarCategories from '../components/SidebarCategories';
import ItemsList from '../components/ItemsList';
import { fetchItems } from '../actions/itemsActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class ItemsContainer extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchItems());
  }

  render() {
    return (
      <div>
        <div style={{ height: '130px' }} />
        <FeatureBanner />
        <Firelane distance={30} />
        <ItemsFilter />
        <Firelane distance={30} />
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: 245,
              display: 'inline-block',
              float: 'left',
              position: 'sticky',
              top: 200,
            }}
          >
            <SidebarCategories />
          </div>
          <div style={{ width: 825, display: 'inline-block' }}>
            <ItemsList {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

ItemsContainer.propTypes = propTypes;


const mapStateToProps = (state) => {
  const { environment, items } = state;
  return ({
    environment,
    items,
  });
};
export default connect(mapStateToProps)(ItemsContainer);
