import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';

import ItemBoard from 'components/ItemBoard';
import ButtonLoadMore from 'components/Button/LoadMore';
import LoadingOverlay from 'components/Loading/Overlay';
import { fetchItems } from 'actions/itemsActions';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import { Container } from './styles';


class CategoriedItemListContainer extends React.Component {

  static propTypes = {
    categoryID: PropTypes.string.isRequired,
    /* redux provide */
    items: myPropTypes.items.isRequired,
    environment: myPropTypes.environment.isRequired,
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
    const { items, environment } = this.props;
    const { records, isFetching, isPaginable } = items;

    return (
      <Container
        styleName="container"
        isLoading={records.length === 0 && isFetching}
        height={(environment.height - 113 - 180)}
      >
        {
          records.length === 0 &&
          isFetching &&
          <LoadingOverlay />
        }
        <div styleName="items-container" className="clear">
          {records.map((item, index) => (
            <div key={`${index + 1}`} styleName="item-card">
              <ItemBoard item={item} />
            </div>
          ))}
        </div>
        <div styleName="load-more-container">
          {
            isPaginable &&
            <ButtonLoadMore
              isLoading={isFetching}
              onClick={this.onLoadMore}
            />
          }
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, items, options, routesHelper } = state;
  return { environment, items, options, routesHelper };
};
export default connect(mapStateToProps)(CSS(CategoriedItemListContainer, styles));
