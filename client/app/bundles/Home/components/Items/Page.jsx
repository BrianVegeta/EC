import React, { PropTypes } from 'react';
import Firelane from '../Firelane';
import ItemsFilter from './ItemsFilter';
import SidebarCategories from './SidebarCategories';
import ItemsList from './ItemsList';
import Spinner from '../../components/Spinner';

const propTypes = {
  currentType: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
  featureHeader: PropTypes.node.isRequired,
};
class Page extends React.Component {
  render() {
    const { items, currentType } = this.props;
    const sidebar = (
      <SidebarCategories
        {...this.props}
        currentType={currentType}
      />
    );
    return (
      <div ref={page => (this.page = page)}>
        <div style={{ height: '130px' }} />
        { this.props.featureHeader }
        <div styleName="filter">
          <ItemsFilter />
        </div>
        <Firelane distance={30} />
        <div styleName="content">
          <div styleName="sidebar">{sidebar}</div>
          <div styleName="main" >
            {
              items.fetchingState === 'fetching' ?
                <Spinner height={500} /> : <ItemsList {...this.props} />
            }
          </div>
        </div>
      </div>
    );
  }
}
Page.propTypes = propTypes;
export default Page;
