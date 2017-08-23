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
      isMine,
    } = model;
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
          {deposit && <Term icon="time" content={deposit} />}
          {payment && <Term icon="bank" content={payment} />}
        </div>
        <div styleName="reserve-button-container">
          <FormButton
            content={isMine ? '編輯商品' : '馬上預訂'}
            colorType={isMine ? 'greenBorder' : 'orange'}
            onClick={isMine ? null : onReserve}
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
