import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import IconRemove from 'react-icons/lib/md/close';
import styles from './styles.sass';
import InputCounter from '../../InputCounter';
import InputUnit from '../../InputUnit';
import {
  INPUT_DAYS_COUNTER_WIDTH,
  INPUT_DISCOUNT_OFFER_WIDTH,
} from '../../../../../constants/dimesions';
import {
  ICON_SIZE_DISCOUNT_CONTROL,
  ICON_COLOR_DISCOUNT_REMOVE,
} from '../../../../../constants/icons';

class DiscountRule extends React.Component {
  static defaultProps = {
    days: null,
    offer: null,
    hasHeader: false,
  };
  static propTypes = {
    days: PropTypes.number,
    offer: PropTypes.number,
    onRemove: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    hasHeader: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.onDaysChange = this.onDaysChange.bind(this);
    this.onOfferChange = this.onOfferChange.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }
  onDaysChange(value) {
    this.props.onChange(value, this.props.offer);
  }
  onOfferChange(value) {
    this.props.onChange(this.props.days, value);
  }
  onRemove() {
    this.props.onRemove();
  }
  render() {
    const { days, offer, hasHeader } = this.props;
    return (
      <div styleName="ruleContainer">
        <div styleName="headers">
          { hasHeader && <div styleName="daysHead">租滿天數（最多30天）</div>}
          { hasHeader && <div styleName="offerHead">優惠折扣</div>}
        </div>
        <div styleName="inputs" className="clear">
          <div styleName="days">
            <InputCounter
              value={days}
              suffix="天"
              min={1}
              max={30}
              width={INPUT_DAYS_COUNTER_WIDTH}
              onChange={this.onDaysChange}
            />
          </div>
          <div styleName="offer">
            <InputUnit
              value={offer}
              suffix="折"
              max={100}
              min={1}
              width={INPUT_DISCOUNT_OFFER_WIDTH}
              onChange={this.onOfferChange}
            />
          </div>
        </div>
        <div styleName="remove">
          <button className="button" onClick={this.onRemove}>
            <IconRemove
              size={ICON_SIZE_DISCOUNT_CONTROL}
              color={ICON_COLOR_DISCOUNT_REMOVE}
            />
          </button>
        </div>
      </div>
    );
  }
}

export default CSS(DiscountRule, styles);
