import React, { PropTypes } from 'react';
import FeatureBanner from './FeatureBanner';
import Firelane from '../Firelane';
import ItemsFilter from './ItemsFilter';
import SidebarCategories from './SidebarCategories';
import ItemsList from './ItemsList';
import ContentLayout from './ContentLayout';
import { fetchCategories, fetchItems } from '../../actions/itemsActions';

const propTypes = {
  category: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
class Page extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
    dispatch(fetchItems());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { dispatch } = this.props;
      dispatch(fetchItems());
    }
  }

  render() {
    console.log(this.props.params);
    const { items, category } = this.props;
    const sidebar = (
      <SidebarCategories
        {...this.props}
        currentType={category}
      />
    );
    return (
      <div>
        <div style={{ height: '130px' }} />
        <FeatureBanner />
        <Firelane distance={30} />
        <div styleName="filter">
          <ItemsFilter />
        </div>
        <Firelane distance={30} />
        <div styleName="content">
          <div styleName="sidebar">{sidebar}</div>
          <div styleName="main" >
            {
              items.fetchingState === 'fetching' ?
                null :
                <ItemsList {...this.props} />
            }
          </div>
        </div>
      </div>
    );
  }
}
Page.propTypes = propTypes;
export default Page;
