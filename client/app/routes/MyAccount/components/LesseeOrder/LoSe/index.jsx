import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

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
    dispatch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.refreshScreen();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tabName !== this.props.tabName) {
      this.refreshScreen();
    }
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  refreshScreen() {
    this.props.dispatchReset();
    this.props.dispatchRecords();
  }

  render() {
    const { myOrder } = this.props;
    // console.log(this.props);
    if (myOrder == null) {
      return null;
    }
    const { records, isFetching, unreads } = myOrder;

    const navs = [
      { name: '提出預訂',
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
      <Container titleText={'消費狀態'}>
        <div style={{ paddingBottom: 20 }}>
          <RoundButton
            text="物品"
            onClick={
              () => { browserHistory.push(my.lesseeOrderItem(TAB_REQUEST)); }
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
          noDataText={(isFetching === false && records.length === 0) ? '尚無任何預定' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          {records.map((record, index) => (
            <OrderServiceBoard
              key={`${index + 1}`}
              type="SERIVCE"
              photoHead={record.owner_img}
              photoName={record.owner_nick_name}
              stage={record.contractstage}
              cid={record.cid}
              pid={record.pid}
              cidNo={record.cid_no}
              paymenttype={record.paymenttype}
              itemName={record.pname}
              itemImgUrl={record.img1}
              targetName={record.owner_nick_name}
              targetUrl={''}
              targetScore={record.ownerscore}
              startDate={record.leasestart}
              endDate={record.leaseend}
              totalPrice={record.lesseepayfee}
              unit={record.unit}
              isOwner={false}
              lesseeReceive={record.lessee_receive}
              isRead={record.lessee_read}
              display={record.display}
              dispatch={this.props.dispatch}
              dispatchRefresh={this.refreshScreen}
            />
          ))}
        </ListContainer>
      </Container>
    );
  }
}

export default OrderList
