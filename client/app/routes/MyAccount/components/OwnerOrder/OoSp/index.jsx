import React from 'react';
import PropTypes from 'prop-types';

import { my } from 'lib/paths';
import ListContainer from 'components/ListContainer';
import OrderSpaceBoard from 'components/OrderSpaceBoard';
import AcccountNav from 'constants/myAccountNavs';
import OrderNav, { SPACE } from '../../OrderNav';
import Navigation from '../../OrderNavigation';
import Container from '../../Container';

import { TAB_REQUEST, TAB_PAY, TAB_WAITING_TO_GO,
   TAB_ONGOING, TAB_COMPLETE, TAB_CANCEL,
    TAB_SUE, TAB_SUE_COMPLETE } from '../../../modules/myOrder';

const titleName = AcccountNav.ownerOrder.text;
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
    // console.log(this.props);
    if (myOrder == null) {
      return null;
    }
    const { records, isFetching, unreads, unreadCount } = myOrder;
    const navs = [
      { name: '收到訂單',
        href: my.ownerOrderSpace(TAB_REQUEST),
        tabName: TAB_REQUEST },
      { name: '尚未付款',
        href: my.ownerOrderSpace(TAB_PAY),
        tabName: TAB_PAY },
      { name: '待開始',
        href: my.ownerOrderSpace(TAB_WAITING_TO_GO),
        tabName: TAB_WAITING_TO_GO },
      { name: '執行中',
        href: my.ownerOrderSpace(TAB_ONGOING),
        tabName: TAB_ONGOING },
      { name: '完成',
        href: my.ownerOrderSpace(TAB_COMPLETE),
        tabName: TAB_COMPLETE },
      { name: '取消',
        href: my.ownerOrderSpace(TAB_CANCEL),
        tabName: TAB_CANCEL },
      { name: '申訴中',
        href: my.ownerOrderSpace(TAB_SUE),
        tabName: TAB_SUE },
      { name: '申訴完成',
        href: my.ownerOrderSpace(TAB_SUE_COMPLETE),
        tabName: TAB_SUE_COMPLETE },
    ];
    return (
      <Container titleText={titleName}>
        <OrderNav
          unreadCount={unreadCount}
          activeType={SPACE}
          isOwner
        />
        <Navigation navs={navs} unreads={unreads} />
        <ListContainer
          minHeight={500}
          noDataText={(isFetching === false && records.length === 0) ? '尚無任何訂單' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          {records.map((record, index) => (
            <OrderSpaceBoard
              key={`${index + 1}`}
              type="SPACE"
              photoHead={record.lessee_img}
              photoName={record.lessee_nick_name}
              photoUid={record.lesseeuid}
              stage={record.contractstage}
              cid={record.cid}
              pid={record.pid}
              cidNo={record.cid_no}
              paymenttype={record.paymenttype}
              itemName={record.pname}
              itemImgUrl={record.img1}
              targetName={record.lessee_nick_name}
              targetUrl={record.lessee_img}
              targetScore={record.lesseescore}
              targetComment={record.lessee_comment}
              startDate={record.leasestart}
              endDate={record.leaseend}
              totalPrice={record.lesseepayfee}
              unit={record.unit}
              isOwner
              isRead={record.owner_read}
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
