import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { my } from 'lib/paths';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import ListContainer from 'components/ListContainer';
import OrderItemBoard from 'components/OrderItemBoard';

import styles from './styles.sass';
import Container from '../../Container';

import { TAB_REQUEST, TAB_PAY, TAB_SHIPPING,
   TAB_RETURN, TAB_COMPLETE, TAB_CANCEL,
    TAB_SUE, TAB_SUE_COMPLETE } from '../../../modules/myOrder';

const cx = classnames.bind(styles);
class OrderList extends React.Component {

  static propTypes = {
    dispatchRecords: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
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
    console.log(this.props);
    if (myOrder == null) {
      return null;
    }
    const { records, isFetching } = myOrder;
    const navs = [
      { name: '收到預定', href: my.ownerOrderItem(TAB_REQUEST) },
      { name: '尚未付款', href: my.ownerOrderItem(TAB_PAY) },
      { name: '待出貨', href: my.ownerOrderItem(TAB_SHIPPING) },
      { name: '待收貨', href: my.ownerOrderItem(TAB_RETURN) },
      { name: '完成', href: my.ownerOrderItem(TAB_COMPLETE) },
      { name: '取消', href: my.ownerOrderItem(TAB_CANCEL) },
      { name: '申訴中', href: my.ownerOrderItem(TAB_SUE) },
      { name: '申訴完成', href: my.ownerOrderItem(TAB_SUE_COMPLETE) },
    ];
    return (
      <Container titleText={'收到的預定'}>
        <div styleName="container">
          <ul className="clear">
            {navs.map((nav, index) => (
              <Link
                key={`${index + 1}`}
                to={nav.href}
                activeClassName={cx('active')}
                onlyActiveOnIndex
              >
                <li>{nav.name}</li>
              </Link>
            ))}
          </ul>
        </div>

        <ListContainer
          minHeight={500}
          noDataText={(isFetching === false && records.length === 0) ? '尚無任何評價' : null}
          isInitialFetching={isFetching && records.length === 0}
        >
          {records.map((record, index) => (
            <OrderItemBoard
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
              display={record.display}
            />
          ))}
        </ListContainer>
      </Container>
    );
  }
}

export default CSS(OrderList, styles);
