import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';

import ItemBoard from 'components/ItemBoard';
import ButtonLoadMore from 'components/Button/LoadMore';
import { fetchItems } from 'actions/itemsActions';

import CSS from 'react-css-modules';
import styles from './styles.sass';


class CategoriedItemListContainer extends React.Component {

  static propTypes = {
    categoryID: PropTypes.number.isRequired,
    /* redux provide */
    items: myPropTypes.items.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onLoadMore = this.onLoadMore.bind(this);
  }

  onLoadMore() {
    this.props.dispatch(fetchItems(this.props.categoryID));
  }

  render() {
    const { props: { items } } = this;
    const { records, isFetching } = items;

    return (
      <div styleName="container">
        <div styleName="items-container">
          {records.map(item => (
            <div key={item.pid} styleName="item-card">
              <ItemBoard item={item} />
            </div>
          ))}
        </div>
        <div styleName="load-more-container">
          <ButtonLoadMore
            isLoading={isFetching}
            onClick={this.onLoadMore}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, items, options, routesHelper } = state;
  return { environment, items, options, routesHelper };
};
export default connect(mapStateToProps)(CSS(CategoriedItemListContainer, styles));
