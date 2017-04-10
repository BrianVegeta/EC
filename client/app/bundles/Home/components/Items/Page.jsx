import React, { PropTypes } from 'react';
// import FeatureBanner from './FeatureBanner';
import FeatureHeader from './FeatureHeader';
import Firelane from '../Firelane';
import ItemsFilter from './ItemsFilter';
import SidebarCategories from './SidebarCategories';
import ItemsList from './ItemsList';
import { fetchCategories, fetchItems } from '../../actions/itemsActions';
import Spinner from '../../components/Spinner';

const propTypes = {
  category: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
class Page extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchItems());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      const { dispatch } = this.props;
      dispatch(fetchItems());
    }
  }

  render() {
    const { items, category, environment } = this.props;
    const { itemsLayoutFixed } = environment;
    const sidebar = (
      <SidebarCategories
        {...this.props}
        currentType={category}
      />
    );
    return (
      <div ref={page => (this.page = page)}>
        <div style={{ height: '130px' }} />
        <FeatureHeader />
        <div styleName="filter">
          <ItemsFilter />
        </div>
        <Firelane distance={30} />
        <div styleName="content">
          <div styleName="sidebar">{sidebar}</div>
          <div styleName="main" >
            {
              items.fetchingState === 'fetching' ?
                <Spinner height={500} /> :
                (this.props.main || <ItemsList {...this.props} />)
            }
          </div>
        </div>
      </div>
    );
  }
}
Page.propTypes = propTypes;
export default Page;
