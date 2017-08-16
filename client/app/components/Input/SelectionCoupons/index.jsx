import React from 'react';
import PropTypes from 'prop-types';

import InputSelection from 'components/Input/Selection';
import { formatCurrency } from 'lib/currency';
import { formatDate } from 'lib/time';

// import CSS from 'react-css-modules';
import classnames from 'classnames/bind';
import styles from './styles.sass';


const cx = classnames.bind(styles);
const optionPropType = PropTypes.shape({
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  expiredAt: PropTypes.number.isRequired,
}).isRequired;

class InputSelectionCoupons extends React.Component {

  static defaultProps = {
    value: null,
  };

  static propTypes = {
    value: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(optionPropType).isRequired,
  };

  static renderNoData() {
    return <div className={cx('no-data')}>尚無折價券可以選擇。</div>;
  }

  static renderOption({ name, amount, expiredAt }) {
    return (
      <div>
        <div>{name}</div>
        <div className="clear">
          <div>{formatCurrency(amount)}</div>
          <div>{formatDate(expiredAt)}到期</div>
        </div>
      </div>
    );
  }

  render() {
    const {
      value,
      onSelect,
      options,
    } = this.props;

    return (
      <InputSelection
        placeholder="選擇折價券"
        value={value}
        options={options}
        onSelect={onSelect}
        renderNoData={this.constructor.renderNoData}
        renderOption={this.constructor.renderOption}
      />
    );
  }
}

export default InputSelectionCoupons;
