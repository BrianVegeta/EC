// @ author: vincent
import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import FormButton from 'components/FormButton';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

import Discounter from './Discounter';
import Term from './Term';


const cx = classnames.bind(styles);
class OrderBoard extends React.Component {

  static defaultProps = {
    isSticky: false,
  };

  static propTypes = {
    model: myPropTypes.orderBoard.isRequired,
    isSticky: PropTypes.bool,
  };

  generateButtonText() {
    const { model: { isMyOwn, type } } = this.props;
    if (isMyOwn) {
      return '編輯商品';
    } else if (type === 'LEASE') {
      return '馬上預訂';
    }
    return '馬上購買';
  }
  render() {
    const { model, isSticky } = this.props;
    const {
      discounts,
      minCostDesc,
      dateRange,
      serviceAssignWay,
      amountRemaining,
      deposit,
      payment,
      onReserve,
      onEdit,
      isMyOwn,
      type,
    } = model;
    console.log(model);
    return (
      <div styleName="container">
        {discounts && discounts.map(({ text, price }, index) => (
          <Discounter key={`${index + 1}`} text={text} price={price} />
        ))}
        <div className={cx('term', { fixed: isSticky })} >
          {minCostDesc && <Term icon="date" content={minCostDesc} />}
          {dateRange && <Term icon="date" content={dateRange} />}
          {serviceAssignWay && <Term icon="person" content={serviceAssignWay} />}
          {amountRemaining &&
            <div styleName="amount-warn">
              {amountRemaining}
            </div>
          }
          {deposit && type === 'LEASE' && <Term icon="time" content={deposit} />}
          {payment && <Term icon="bank" content={payment} />}
        </div>
        <div styleName="reserve-button-container">
          <FormButton
            content={this.generateButtonText()}
            colorType={isMyOwn ? 'greenBorder' : 'orange'}
            style={{ height: 52 }}
            onClick={isMyOwn ? onEdit : onReserve}
            size="md"
          />
        </div>
        <div styleName="notice-container">
          <div>預訂後!</div>
          <div>須等待分享人同意，才會進行付款喔。</div>
        </div>
      </div>
    );
  }
}

export default CSS(OrderBoard, styles);
