import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from 'components/Form/Group';
import InputSelectionCoupons from 'components/Input/SelectionCoupons';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class InputCoupons extends React.Component {

  static defaultProps = {
    couponNo: null,
  };

  static propTypes = {
    couponNo: PropTypes.string,
    changeData: PropTypes.func.isRequired,
    coupons: PropTypes.shape({
      records: PropTypes.array.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onSelect({ value }) {
    this.props.changeData({ couponNo: value });
  }

  onReset() {
    this.props.changeData({ couponNo: null });
  }

  render() {
    const {
      couponNo,
      coupons: { records: myCouponList },
    } = this.props;
    return (
      <FormGroup>
        <div styleName="coupons-container">
          <InputSelectionCoupons
            couponNo={couponNo}
            options={myCouponList}
            onSelect={this.onSelect}
          />
        </div>
        {
          couponNo &&
          <button
            className="button"
            styleName="cancel"
            onClick={this.onReset}
          >
            X 取消折價券
          </button>
        }
      </FormGroup>
    );
  }
}

export default CSS(InputCoupons, styles);
