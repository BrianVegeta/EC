import React from 'react';
import PropTypes from 'prop-types';

import { my } from 'lib/paths';
import ListContainer from 'components/ListContainer';
import UsedItemBoard from 'components/UsedItemBoard';
import AcccountNav from 'constants/myAccountNavs';
import OrderNav, { USED_ITEM } from '../../OrderNav';
import Navigation from '../../OrderNavigation';
import Container from '../../Container';

import { TAB_PAY, TAB_SHIPPING,
   TAB_SHIPPING_CONFIRM, TAB_COMPLETE, TAB_CANCEL,
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
        href: my.ownerOrderUsedItem(TAB_PAY),
        tabName: TAB_PAY },
      { name: '待出貨',
        href: my.ownerOrderUsedItem(TAB_SHIPPING),
        tabName: TAB_SHIPPING },
      { name: '運送中',
        href: my.ownerOrderUsedItem(TAB_SHIPPING_CONFIRM),
        tabName: TAB_SHIPPING_CONFIRM },
      { name: '完成',
        href: my.ownerOrderUsedItem(TAB_COMPLETE),
        tabName: TAB_COMPLETE },
      { name: '取消',
        href: my.ownerOrderUsedItem(TAB_CANCEL),
        tabName: TAB_CANCEL },
      { name: '退貨/申訴中',
        href: my.ownerOrderUsedItem(TAB_SUE),
        tabName: TAB_SUE },
      { name: '退貨/申訴完成',
        href: my.ownerOrderUsedItem(TAB_SUE_COMPLETE),
        tabName: TAB_SUE_COMPLETE },
    ];
    return (
      <Container titleText={titleName}>
        <OrderNav
          unreadCount={unreadCount}
          activeType={USED_ITEM}
          isOwner
        />
        <Navigation navs={navs} unreads={unreads} />
        <ListContainer
          minHeight={500}
          noDataText={(isFetching === false && records.length === 0) ? '尚無任何訂單' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          {records.map((record, index) => (
            <UsedItemBoard
              key={`${index + 1}`}
              type="USED_ITEM"
              photoHead={record.lessee_img}
              photoName={record.lessee_nick_name}
              photoUid={record.lesseeuid}
              isOwner
              isRead={record.owner_read}
              order={record}
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
