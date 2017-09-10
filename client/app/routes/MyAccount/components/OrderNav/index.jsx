import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import RoundButton from 'components/RoundButton';
import { my } from 'lib/paths';
import { TAB_REQUEST, TAB_PAY } from '../../modules/myOrder';
// import classnames from 'classnames/bind';
// import CSS from 'react-css-modules';
export const ITEM = 0;
export const SERVICE = 1;
export const SPACE = 2;
export const USED_ITEM = 3;

class OrderNav extends React.Component {
  static defaultProps = {
    isOwner: false,
  }

  static propTypes = {
    isOwner: PropTypes.bool,
    activeType: PropTypes.number.isRequired,
  };

  redirect(type) {
    const { isOwner } = this.props;
    if (isOwner) {
      switch (type) {
        case ITEM:
          return browserHistory.push(my.ownerOrderItem(TAB_REQUEST));
        case SERVICE:
          return browserHistory.push(my.ownerOrderService(TAB_REQUEST));
        case SPACE:
          return browserHistory.push(my.ownerOrderSpace(TAB_REQUEST));
        case USED_ITEM:
          return browserHistory.push(my.ownerOrderUsedItem(TAB_PAY));
        default:
          return browserHistory.push('/');
      }
    }

    switch (type) {
      case ITEM:
        return browserHistory.push(my.lesseeOrderItem(TAB_REQUEST));
      case SERVICE:
        return browserHistory.push(my.lesseeOrderService(TAB_REQUEST));
      case SPACE:
        return browserHistory.push(my.lesseeOrderSpace(TAB_REQUEST));
      case USED_ITEM:
        return browserHistory.push(my.lesseeOrderUsedItem(TAB_PAY));
      default:
        return browserHistory.push('/');
    }
  }
  render() {
    const { activeType } = this.props;
    return (
      <div style={{ paddingBottom: 20 }}>
        <RoundButton
          text="物品"
          isActive={activeType === ITEM}
          onClick={
            () => { this.redirect(ITEM); }
          }
        />
        <RoundButton
          text="服務"
          isActive={activeType === SERVICE}
          onClick={
            () => { this.redirect(SERVICE); }
          }
        />
        <RoundButton
          text="空間"
          isActive={activeType === SPACE}
          onClick={
            () => { this.redirect(SPACE); }
          }
        />
        <RoundButton
          text="二手"
          isActive={activeType === USED_ITEM}
          onClick={
            () => { this.redirect(USED_ITEM); }
          }
        />
      </div>
    );
  }
}

export default OrderNav;
