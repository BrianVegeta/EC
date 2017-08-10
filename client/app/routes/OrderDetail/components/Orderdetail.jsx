import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons/lib/fa/calendar-o';

import CalculationPanel from 'components/reservation/wrapper/CalculationPanel';
import CSS from 'react-css-modules';
import FormButtom from 'components/FormButton';

import { formatDate } from 'lib/time'
import colors from 'styles/colorExport.scss';
import styles from './styles.sass';

import Calculation from '../adapter/Calculation'
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
    const { order } = orderdetail;
    if (order == null) {
      return null;
    }
    const { display } = order;
    const { bankReady, ownerProfile, lesseeProfile } = orderdetail;

    if (order.contractstage < 4) {
      this.show_bank = true;
      this.bank_ok = bankReady;
    } else {
      this.show_bank = false;
    }
    this.ownerPicture = ownerProfile ? ownerProfile.picture : null;
    this.lesseePicture = lesseeProfile ? lesseeProfile.picture : null;

    this.Calculation = new Calculation('FIX', order.price, order.deposit, order.unit,
        order.discounts, 0, order.leasestart, order.leaseend);

    const model2 = {
      priceDesc: this.Calculation.getPriceDesc(),
      depositDesc: this.Calculation.getDepositDesc(),
      couponDesc: this.Calculation.getCouponDesc(),
      discountDesc: this.Calculation.getDiscountDesc(),
      total: this.Calculation.total_price,
    }

    this.showSecondLine = false;

    switch (order.send_type) {
      case '0':
        this.sendTypeName = '面交';
        this.sendDetail = ''
        break;
      case '1':
        this.sendTypeName = '自行寄送';
        this.showSecondLine = true;
        break;
      default:
        this.sendTypeName = '';
        this.sendDetail = '';
        break;
    }

    switch (order.return_type) {
      case '0':
        this.returnTypeName = '面交';
        this.returnDetail = ''
        break;
      case '1':
        this.returnTypeName = '自行寄送';
        this.showSecondLine = true;
        break;
      default:
        this.returnTypeName = '其他';
        this.returnDetail = ''
    }
    this.overdue_rate_per_day = (order.overdue_rate == null) ? 0 :
    ((order.deposit * order.overdue_rate) / 100);

    return (
      <div>
        <div styleName="container">
          <div styleName="header">
            <h1 styleName="title">
              <span styleName="text">訂單詳情</span>
            </h1>
          </div>
          <div styleName="section-content">
            <div styleName="banner_style" >
              <Banner
                type={order.contractstage}
                startDate={order.leasestart}
              />
            </div>
            <div styleName="top_40px_style">
              <MiniMap
                cover={`${order.img1}`}
                cidNumber={`合約編號：${order.cid_no}`}
                itemName={`${order.pname}`}
              />
            </div>
            <div styleName="top_40px_style">
              <UserInfoBoard
                realname={display.is_owner ? order.owner_real_name : order.lessee_real_name }
                phone={display.is_owner ? order.ownerphone : order.lesseephone}
                imgUrl={display.is_owner ? this.ownerPicture : this.lesseePicture }
              />
            </div>
          </div>
          <div styleName="section-content">
            <div styleName="section-header">使用時間</div>
            <div style={{ paddingBottom: 40 }}>
              <div styleName="mini-icon-style">
                <Icon size={35} />
              </div>
              <div styleName="mini-icon-text-style">{`使用日期：${formatDate(order.leasestart)}~${formatDate(order.leaseend)}`}</div>
            </div>
          </div>
          <div styleName="section-content">
            <div styleName="section-header">物流方式</div>
            <div style={{ position: 'relative' }}>
              <div styleName="half-width-style">{ `到貨方式: ${this.sendTypeName}` }</div>
              <div styleName="half-width-style">{ `還貨方式: ${this.returnTypeName}` }</div>
            </div>
            { this.showSecondLine && <div style={{ position: 'relative', paddingTop: 10 }}>
              <div styleName="half-width-style">{ this.sendDetail }</div>
              <div styleName="half-width-style">{ this.rendDetail }</div>
            </div>
            }
            <div styleName="padding-40btm-style" />
          </div>
          <div styleName="section-content">
            <div styleName="section-header">交易明細</div>
            <CalculationPanel
              model={model2}
            />
            <div style={{ paddingBottom: 50, paddingTop: 20, fontSize: 16, fontWeight: 400 }}>
              備註：請盡快同意！</div>
            { this.show_bank &&
              <div>
                { (this.bank_ok === 1) ?
                  <div style={{ display: 'inline-block', color: colors.blackColor }}>設定銀行帳戶</div> :
                  <div style={{ display: 'inline-block', color: colors.colorHeart }}>您尚未設定銀行帳戶喔！</div>
                }
                <div style={{ display: 'inline-block', marginLeft: 20 }}>
                  <FormButtom
                    colorType="greenBorder"
                    size="sm"
                    width={120}
                    content="前往設定"
                  />
                </div>
                <div style={{ color: colors.placeholder, paddingTop: 20, paddingBottom: 50 }}>
                  當交易完成後，銀行會在每週一、三，將您的收入款項轉帳至您的銀行帳戶
                </div>
              </div>
            }
          </div>
          { (order.rules.length > 0) && <div styleName="section-content">
            <div styleName="section-header">分享人守則</div>
            <div>
              {
                order.rules.map((rule, i) =>
                  <div key={`${rule.describe}_${i + 1}`}>{rule}</div>
              )}
            </div>
            <div styleName="padding-40btm-style" />
          </div>
          }
          { (order.cancel_policys.length > 0) && <div styleName="section-content">
            <div styleName="section-header">退訂政策</div>
            <div>
              <span>開始租借前</span>
              <span style={{ color: colors.colorHeart }}>
                {order.cancel_policys[0].advance_day}
              </span>
              <span>天取消訂單，扣除</span>
              <span style={{ color: colors.colorHeart }}>{`${order.cancel_policys[0].rate}%`}</span>
              <span>金額</span>
            </div>
            <div styleName="padding-40btm-style" />
          </div>
          }
          { order.overdue_rate && <div styleName="section-content">
            <div styleName="section-header">逾期金政策</div>
            <div>
              <span>逾期1天，將從押金扣除</span>
              <span style={{ color: colors.colorHeart }}>{`NTD$${this.overdue_rate_per_day}`}</span>
              <span>，扣除的總金額則取決於逾期的天數做累加計算</span>
            </div>
            <div styleName="padding-40btm-style" />
          </div>
          }
        </div>
        <div style={{ height: 130 }}>
          { display.can_canel &&
            <div style={{ display: 'inline-block', marginLeft: 20, verticalAlign: 'middle' }}>
              <FormButtom
                colorType="greenBorder"
                size="sm"
                width={150}
                content={display.is_owner ? '目前無法接單' : '取消訂單' }
              />
            </div>
          }
          { display.can_accept && <div style={{ display: 'inline-block', marginLeft: 20, verticalAlign: 'middle' }}>
            <FormButtom
              colorType="greenBorder"
              size="sm"
              width={150}
              content="我同意此預訂"
            />
          </div>
          }
          { display.can_rejct && <div style={{ display: 'inline-block', width: 420, marginLeft: 20, verticalAlign: 'middle' }}>
            <div>
              <span>對於此預訂單有問題嗎？您可以提出修改並私訊享用人，請對方做修改喔!</span>
              <span style={{ color: colors.activeColor }}> 提出修改預訂單 </span>
            </div>
          </div>
          }
          { display.can_pay && <div style={{ display: 'inline-block', marginLeft: 20, verticalAlign: 'middle' }}>
            <FormButtom
              colorType="greenBorder"
              size="sm"
              width={150}
              content="付款"
            />
          </div>
          }
        </div>
      </div>
    );
  }
}
export default CSS(Orderdetail, styles);
