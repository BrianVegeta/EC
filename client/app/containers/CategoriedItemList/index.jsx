import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';

import Pictrue from 'components/Picture';
import ItemBoard from 'components/ItemBoard';

import CSS from 'react-css-modules';
import styles from './styles.sass';


class CategoriedItemListContainer extends React.Component {

  static propTypes = {
    categoryID: PropTypes.number.isRequired,
    /* redux provide */
    items: myPropTypes.items.isRequired,
  };

  render() {
    const { props: { items } } = this;
    const { records } = items;

    return (
      <div styleName="container">
        <div styleName="items-container">
          {records.map(item => (
            <div key={item.pid} styleName="item-card">
              <ItemBoard item={item} />
            </div>
          ))}
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
