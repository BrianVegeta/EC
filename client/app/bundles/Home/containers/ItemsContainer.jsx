import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FeatureBanner from '../components/FeatureBanner';
import Firelane from '../components/Firelane';
import ItemsFilter from '../components/ItemsFilter';
import SidebarCategories from '../components/SidebarCategories';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class ItemsContainer extends React.Component {
  render() {
    return (
      <div>
        <div style={{ height: '130px' }} />
        <FeatureBanner />
        <Firelane distance={30} />
        <ItemsFilter />
        <Firelane distance={30} />
        <SidebarCategories />
      </div>
    );
  }
}

ItemsContainer.propTypes = propTypes;


const mapStateToProps = (state) => {
  const { environment } = state;
  return ({
    environment,
  });
};
export default connect(mapStateToProps)(ItemsContainer);
