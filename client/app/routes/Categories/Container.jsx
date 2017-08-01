import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import Firelane from 'components/Firelane';
import List from './List';
import Splitline from './List/Splitline';

class CategoriesContainer extends React.Component {

  static propTypes = {
    options: PropTypes.shape({
      categories: myPropTypes.categories.isRequired,
    }).isRequired,
  };

  render() {
    const { options: { categories } } = this.props;
    if (isEmpty(categories)) {
      return null;
    }

    return (
      <div>
        <List type="goods" {...this.props} />
        <Splitline />
        <Firelane distance={80} />
        <List type="service" {...this.props} />
        <Splitline />
        <Firelane distance={80} />
        <List type="space" {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, items, routesHelper } = state;
  return { environment, items, routesHelper };
};
export default connect(mapStateToProps)(CategoriesContainer);
