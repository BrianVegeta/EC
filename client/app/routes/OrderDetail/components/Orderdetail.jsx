import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons/lib/fa/adjust';
import CSS from 'react-css-modules';

import styles from './styles.sass';

import Banner from './Banner/index'
import MiniMap from './MiniMap/index'
import UserInfoBoard from './UserInfoBoard/index'

class Orderdetail extends React.Component {

  static propTypes = {
    orderdetail: PropTypes.shape({
      order: PropTypes.Object,
      userprofile: PropTypes.Object,
    }).isRequired,
  };

  render() {
    const { orderdetail } = this.props;
    const model = {
      cover: 'https://shareapisd.s3.amazonaws.com/SACD5073_1502076519413.jpg',
      pname: 'TITLE',
      priceDesc: '200',
      priceUnit: '1',
    }
    console.log(this.props);
    return (
      <div styleName="container">
        <div styleName="header">
          <h1 styleName="title">
            <span styleName="text">訂單詳情</span>
          </h1>
        </div>
        <div styleName="section-content">
          <div styleName="banner_style" >
            <Banner/>
          </div>
          <div styleName="top_40px_style">
            <MiniMap
              cover="https://shareapisd.s3.amazonaws.com/SACD5073_1502076519413.jpg"
              cidNumber="cid: XZJAKLJKLJKLKJDALKFKLDF"
              itemName="im the item NAME"
            />
          </div>
          <div styleName="top_40px_style">
            <UserInfoBoard/>
          </div>
        </div>
        <div styleName="section-content">
          <div styleName="section-header">物流時間</div>
          <div style={{ paddingBottom: 40 }}>
            <div styleName="mini-icon-style">
              <Icon size={35} />
            </div>
            <div styleName="mini-icon-text-style">使用日期：2017/04/10</div>
          </div>
        </div>
        <div styleName="section-content">
          <div styleName="section-header">物流方式</div>
          <div style={{ position: 'relative' }}>
            <div styleName="half-width-style">'送貨方式：7-11交貨便'</div>
            <div styleName="half-width-style">'寄還方式：7-11交貨便'</div>
          </div>
          <div style={{ position: 'relative', paddingBottom: 40, paddingTop: 10 }}>
            <div styleName="half-width-style">'門市：采鋺門市（店號：123456)'</div>
            <div styleName="half-width-style">'門市：采鋺門市（店號：123456）'</div>
          </div>
        </div>
        <div styleName="section-content">
          <div styleName="section-header">交易明細</div>
        </div>
      </div>
    );
  }
}
export default CSS(Orderdetail, styles);
