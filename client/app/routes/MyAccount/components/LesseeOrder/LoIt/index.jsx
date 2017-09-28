import React from 'react';
import PropTypes from 'prop-types';

import { my } from 'lib/paths';
import ListContainer from 'components/ListContainer';
import OrderItemBoard from 'components/OrderItemBoard';
import AcccountNav from 'constants/myAccountNavs';
import OrderNav, { ITEM } from '../../OrderNav';
import Navigation from '../../OrderNavigation';
import Container from '../../Container';

import {
  TAB_REQUEST, TAB_PAY, TAB_SHIPPING, TAB_SHIPPING_CONFIRM,
  TAB_RETURN, TAB_COMPLETE, TAB_CANCEL,
  TAB_SUE, TAB_SUE_COMPLETE,
} from '../../../modules/myOrder';

const titleName = AcccountNav.lesseeOrder.text;
class OrderList extends React.Component {

  static propTypes = {
    dispatchRecords: PropTypes.func.isRequired,
    dispatchUnreadCount: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    tabName: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    myOrder: PropTypes.shape({
      isFetching: PropTypes.bool,
      unreadCount: PropTypes.shape({
        item: PropTypes.number,
        service: PropTypes.number,
        space: PropTypes.number,
        used_item: PropTypes.number,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.refreshScreen = this.refreshScreen.bind(this);
  }

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
    this.props.dispatchUnreadCount();
  }

  render() {
    const { myOrder } = this.props;
    if (myOrder == null) return null;

    const { records, isFetching, unreads, unreadCount } = myOrder;
    const navs = [
      ['提出預訂', my.lesseeOrderItem(TAB_REQUEST), TAB_REQUEST],
      ['待付款', my.lesseeOrderItem(TAB_PAY), TAB_PAY],
      ['待收貨', my.lesseeOrderItem(TAB_SHIPPING_CONFIRM), TAB_SHIPPING],
      ['待還貨', my.lesseeOrderItem(TAB_RETURN), TAB_RETURN],
      ['完成', my.lesseeOrderItem(TAB_COMPLETE), TAB_COMPLETE],
      ['取消', my.lesseeOrderItem(TAB_CANCEL), TAB_CANCEL],
      ['申訴中', my.lesseeOrderItem(TAB_SUE), TAB_SUE],
      ['申訴完成', my.lesseeOrderItem(TAB_SUE_COMPLETE), TAB_SUE_COMPLETE],
    ];
    return (
      <Container titleText={titleName}>
        <OrderNav
          unreadCount={unreadCount}
          activeType={ITEM}
        />
        <Navigation
          navs={navs.map(([name, href, tabName]) => ({ name, href, tabName }))}
          unreads={unreads}
        />
        <ListContainer
          minHeight={500}
          noDataText={(isFetching === false && records.length === 0) ? '尚無任何預定' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          {records.map((record, index) => (
            <OrderItemBoard
              key={`${index + 1}`}
              type="ITEM"
              photoHead={record.owner_img}
              photoName={record.owner_nick_name}
              photoUid={record.owneruid}
              stage={record.contractstage}
              cid={record.cid}
              pid={record.pid}
              cidNo={record.cid_no}
              paymenttype={record.paymenttype}
              itemName={record.pname}
              itemImgUrl={record.img1}
              targetName={record.owner_nick_name}
              targetUrl={record.owner_img}
              targetScore={record.ownerscore}
              targetComment={record.owner_comment}
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

export default OrderList;
