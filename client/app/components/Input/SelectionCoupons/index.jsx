import React from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import IconCancel from 'react-icons/lib/md/add-circle-outline';

import InputSelection from 'components/Input/Selection';
import { formatCurrency } from 'lib/currency';
import { formatDate } from 'lib/time';

import classnames from 'classnames/bind';
import styles from './styles.sass';


const cx = classnames.bind(styles);
const optionPropType = PropTypes.shape({
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  coupon_no: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  expiration_time: PropTypes.number.isRequired,
}).isRequired;

class InputSelectionCoupons extends React.Component {

  static defaultProps = {
    couponNo: null,
  };

  static propTypes = {
    couponNo: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(optionPropType).isRequired,
  };

  static renderNoData() {
    return <div className={cx('no-data')}>尚無折價券可以選擇。</div>;
  }

  static renderOption({ name, amount, expiration_time }) {
    return (
      <div className={cx('option-container')}>
        <div className={cx('name')}>{name}</div>
        <div className="clear">
          <span className={cx('price')}>{formatCurrency(amount)}</span>
          <span className={cx('expire-date')}>
            {formatDate(expiration_time)}到期
          </span>
        </div>
      </div>
    );
  }

  static renderChoice({ name }) {
    return name;
  }

  getSelectionOptions() {
    const { options } = this.props;

    return options.map((option) => {
      const { coupon_no, ...otherOption } = option;
      return { value: coupon_no, ...otherOption };
    });
  }

  getChoice() {
    const { couponNo } = this.props;
    return find(this.getSelectionOptions(), { value: couponNo });
  }

  render() {
    const {
      couponNo,
      onSelect,
    } = this.props;

    return (
      <InputSelection
        ref={inputSelection => (this.inputSelection = inputSelection)}
        placeholder="選擇折價券"
        value={couponNo}
        options={this.getSelectionOptions()}
        onSelect={option => onSelect(option)}
        renderNoData={this.constructor.renderNoData}
        renderOption={this.constructor.renderOption}
        renderChoice={this.constructor.renderChoice}
      />
    );
  }
}

export default InputSelectionCoupons;
