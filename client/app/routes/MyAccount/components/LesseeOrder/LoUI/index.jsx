import React from 'react';
import PropTypes from 'prop-types';

import { my } from 'lib/paths';
import AcccountNav from 'constants/myAccountNavs';
import ListContainer from 'components/ListContainer';
import UsedItemBoard from 'components/UsedItemBoard';
import OrderNav, { USED_ITEM } from '../../OrderNav';
import Navigation from '../../OrderNavigation';
import Container from '../../Container';

import { TAB_PAY, TAB_SHIPPING, TAB_SHIPPING_CONFIRM,
   TAB_COMPLETE, TAB_CANCEL,
    TAB_SUE, TAB_SUE_COMPLETE } from '../../../modules/myOrder';

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
    // console.log(this.props);
    if (myOrder == null) {
      return null;
    }
    const { records, isFetching, unreads, unreadCount } = myOrder;
    const navs = [
      ['尚未付款', my.lesseeOrderUsedItem(TAB_PAY), TAB_PAY],
      ['待出貨', my.lesseeOrderUsedItem(TAB_SHIPPING), TAB_SHIPPING],
      ['運送中', my.lesseeOrderUsedItem(TAB_SHIPPING_CONFIRM), TAB_SHIPPING_CONFIRM],
      ['完成', my.lesseeOrderUsedItem(TAB_COMPLETE), TAB_COMPLETE],
      ['取消', my.lesseeOrderUsedItem(TAB_CANCEL), TAB_CANCEL],
      ['退貨/申訴中', my.lesseeOrderUsedItem(TAB_SUE), TAB_SUE],
      ['退貨/申訴完成', my.lesseeOrderUsedItem(TAB_SUE_COMPLETE), TAB_SUE_COMPLETE],
    ];
    return (
      <Container titleText={titleName}>
        <OrderNav
          unreadCount={unreadCount}
          activeType={USED_ITEM}
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
            <UsedItemBoard
              key={`${index + 1}`}
              type="USED_ITEM"
              photoHead={record.owner_img}
              photoName={record.owner_nick_name}
              photoUid={record.owneruid}
              isOwner={false}
              isRead={record.lessee_read}
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
