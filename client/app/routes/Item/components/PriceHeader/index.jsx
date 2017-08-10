import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import { formatCurrency } from 'lib/currency';

class PriceHeader extends React.Component {
  static defaultProps = {
    price: 0,
  }
  static propTypes = {
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }
  render() {
    const { price } = this.props;
    return (
      <div styleName="container">
        <span styleName="price">{formatCurrency(price)}</span> /天
      </div>
    );
  }
}

export default CSS(PriceHeader, styles);
