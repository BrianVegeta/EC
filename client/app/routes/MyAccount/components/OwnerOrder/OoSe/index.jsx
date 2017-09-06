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
      { name: '收到訂單',
        href: my.ownerOrderService(TAB_REQUEST),
        tabName: TAB_REQUEST },
      { name: '尚未付款',
        href: my.ownerOrderService(TAB_PAY),
        tabName: TAB_PAY },
      { name: '待開始',
        href: my.ownerOrderService(TAB_WAITING_TO_GO),
        tabName: TAB_WAITING_TO_GO },
      { name: '執行中',
        href: my.ownerOrderService(TAB_ONGOING),
        tabName: TAB_ONGOING },
      { name: '完成',
        href: my.ownerOrderService(TAB_COMPLETE),
        tabName: TAB_COMPLETE },
      { name: '取消',
        href: my.ownerOrderService(TAB_CANCEL),
        tabName: TAB_CANCEL },
      { name: '申訴中',
        href: my.ownerOrderService(TAB_SUE),
        tabName: TAB_SUE },
      { name: '申訴完成',
        href: my.ownerOrderService(TAB_SUE_COMPLETE),
        tabName: TAB_SUE_COMPLETE },
    ];
    return (
      <Container titleText={'廠商訂單'}>
        <div style={{ paddingBottom: 20 }}>
          <RoundButton
            text="物品"
            onClick={
              () => { browserHistory.push(my.ownerOrderItem(TAB_REQUEST)); }
            }
          />
          <RoundButton
            text="服務"
            isActive
            onClick={
              () => { browserHistory.push(my.ownerOrderService(TAB_REQUEST)); }
            }
          />
          <RoundButton
            text="空間"
            onClick={
              () => { browserHistory.push(my.ownerOrderSpace(TAB_REQUEST)); }
            }
          />
        </div>
        <Navigation navs={navs} unreads={unreads} />
        <ListContainer
          minHeight={500}
          noDataText={(isFetching === false && records.length === 0) ? '尚無任何訂單' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          {records.map((record, index) => (
            <OrderServiceBoard
              key={`${index + 1}`}
              type="SERVICE"
              photoHead={record.lessee_img}
              photoName={record.lessee_nick_name}
              stage={record.contractstage}
              cid={record.cid}
              pid={record.pid}
              cidNo={record.cid_no}
              paymenttype={record.paymenttype}
              itemName={record.pname}
              itemImgUrl={record.img1}
              targetName={record.lessee_nick_name}
              targetUrl={''}
              targetScore={record.lesseescore}
              targetComment={record.lessee_comment}
              startDate={record.leasestart}
              endDate={record.leaseend}
              totalPrice={record.lesseepayfee}
              isOwner
              isRead={record.owner_read}
              unit={record.unit}
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
