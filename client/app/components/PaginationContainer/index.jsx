import React from 'react';
import PropTypes from 'prop-types';

import myPropTypes from 'propTypes';
import ButtonLoadMore from 'components/Button/LoadMore';

import CSS from 'react-css-modules';
import styles from './styles.sass';


class PaginationContainer extends React.Component {

  static propTypes = {
    isPaginable: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    loadMore: PropTypes.func.isRequired,
    children: myPropTypes.children.isRequired,
  };

  static renderLoadMore({ isFetching, loadMore }) {
    return (
      <div styleName="load-more-container" >
        <ButtonLoadMore isLoading={isFetching} onClick={loadMore} />
      </div>
    );
  }

  render() {
    const { isPaginable, isFetching, loadMore, children } = this.props;
    const { renderLoadMore } = this.constructor;
    return (
      <div styleName="container">
        {children}
        {isPaginable && renderLoadMore({ isFetching, loadMore })}
      </div>
    );
  }
}

export default CSS(PaginationContainer, styles);
