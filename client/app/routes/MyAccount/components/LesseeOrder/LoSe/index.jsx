import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';

import { my } from 'lib/paths';

// import classnames from 'classnames/bind';
// import CSS from 'react-css-modules';

import ListContainer from 'components/ListContainer';
import OrderServiceBoard from 'components/OrderServiceBoard';
import RoundButton from 'components/RoundButton';

import Navigation from '../../OrderNavigation';
import Container from '../../Container';

import { TAB_REQUEST, TAB_PAY, TAB_WAITING_TO_GO,
   TAB_ONGOING, TAB_COMPLETE, TAB_CANCEL,
    TAB_SUE, TAB_SUE_COMPLETE } from '../../../modules/myOrder';

class OrderList extends React.Component {

  static propTypes = {
    dispatchRecords: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    tabName: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.dispatchReset();
    this.props.dispatchRecords();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tabName !== this.props.tabName) {
      this.props.dispatchReset();
      this.props.dispatchRecords();
    }
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const { myOrder } = this.props;
    // console.log(this.props);
    if (myOrder == null) {
      return null;
    }
    const { records, isFetching, unreads } = myOrder;

    const navs = [
      { name: '收到預定',
        href: my.lesseeOrderService(TAB_REQUEST),
        tabName: TAB_REQUEST },
      { name: '尚未付款',
        href: my.lesseeOrderService(TAB_PAY),
        tabName: TAB_PAY },
      { name: '待開始',
        href: my.lesseeOrderService(TAB_WAITING_TO_GO),
        tabName: TAB_WAITING_TO_GO },
      { name: '執行中',
        href: my.lesseeOrderService(TAB_ONGOING),
        tabName: TAB_ONGOING },
      { name: '完成',
        href: my.lesseeOrderService(TAB_COMPLETE),
        tabName: TAB_COMPLETE },
      { name: '取消',
        href: my.lesseeOrderService(TAB_CANCEL),
        tabName: TAB_CANCEL },
      { name: '申訴中',
        href: my.lesseeOrderService(TAB_SUE),
        tabName: TAB_SUE },
      { name: '申訴完成',
        href: my.lesseeOrderService(TAB_SUE_COMPLETE),
        tabName: TAB_SUE_COMPLETE },
    ];
    return (
      <Container titleText={'預訂記錄'}>
        <div style={{ paddingBottom: 20 }}>
          <RoundButton
            text="物品"
            onClick={
              () => { browserHistory.push(my.lesseeOrderService(TAB_REQUEST)); }
            }
          />
          <RoundButton
            text="服務"
            isActive
            onClick={
              () => { browserHistory.push(my.lesseeOrderService(TAB_REQUEST)); }
            }
          />
          <RoundButton
            text="空間"
            onClick={
              () => { browserHistory.push(my.lesseeOrderSpace(TAB_REQUEST)); }
            }
          />
        </div>
        <Navigation navs={navs} unreads={unreads} />
        <ListContainer
          minHeight={500}
          noDataText={(isFetching === false && records.length === 0) ? '尚無任何評價' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          {records.map((record, index) => (
            <OrderServiceBoard
              key={`${index + 1}`}
              photoHead={record.lessee_img}
              photoName={record.lessee_nick_name}
              stage={record.contractstage}
              cid={record.cid}
              cidNo={record.cid_no}
              itemName={record.pname}
              itemImgUrl={record.img1}
              startDate={record.leasestart}
              endDate={record.leaseend}
              totalPrice={record.lesseepayfee}
              unit={record.unit}
              isRead={record.lessee_read}
              display={record.display}
            />
          ))}
        </ListContainer>
      </Container>
    );
  }
}

export default OrderList
