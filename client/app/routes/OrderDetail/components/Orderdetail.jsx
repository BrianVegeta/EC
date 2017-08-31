/* eslint-disable class-methods-use-this */
import React from 'react';
import PropTypes from 'prop-types';
import IconCalendar from 'react-icons/lib/fa/calendar-o';
import IconLocation from 'react-icons/lib/md/location-on';

import BillingDetail, { calculateService } from 'components/BillingDetail';
import FormButton from 'components/FormButton';
import MiniMap from 'components/MiniMap/index';
import CoverThreePics from 'components/CoverThreePics';
import { formatDate, rangeDiff } from 'lib/time';

import CSS from 'react-css-modules';
import colors from 'styles/colorExport.scss';
import styles from './styles.sass';

import Banner from './Banner';
import SueBanner from './SueBanner';
import UserInfoBoard from './UserInfoBoard/index';

class Orderdetail extends React.Component {

  static propTypes = {
    orderdetail: PropTypes.shape({
      order: PropTypes.Object,
      userprofile: PropTypes.Object,
    }).isRequired,
    sueDetail: PropTypes.shape({
      u_no: PropTypes.string,
      type: PropTypes.string,
      status: PropTypes.number,
      img1: PropTypes.string,
      img2: PropTypes.string,
      img3: PropTypes.string,
      defender_name: PropTypes.string,
      suer_name: PropTypes.string,
      case_end: PropTypes.number,
      create_time: PropTypes.number,
    }),
    dispatch: PropTypes.func.isRequired,
    dispatchBankSetup: PropTypes.func.isRequired,
    dispatchPopupScore: PropTypes.func.isRequired,
    dispatchRecords: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatchAccept: PropTypes.func.isRequired,
    dispatchCancel: PropTypes.func.isRequired,
    dispatchReject: PropTypes.func.isRequired,
    dispatchPaymentInfo: PropTypes.func.isRequired,
    dispatchPaymentCreditCard: PropTypes.func.isRequired,
    dispatchShipGoods: PropTypes.func.isRequired,
    dispatchReturn: PropTypes.func.isRequired,
    dispatchReceiveConfirm: PropTypes.func.isRequired,
    dispatchEndSpace: PropTypes.func.isRequired,
    dispatchEndService: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatchRecords();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  getPaymentAction({ paymenttype }) {
    switch (paymenttype) {
      case 4:
        return this.props.dispatchPaymentCreditCard;
      case 1:
        return this.props.dispatchPaymentInfo;
      default:
        return () => {};
    }
  }

  renderButtonStyle(show, dispatchAction, buttonText) {
    if (!(show)) {
      return null;
    }
    return (
      <div style={{ display: 'inline-block', marginLeft: 20, verticalAlign: 'middle' }}>
        <FormButton
          colorType="greenBorder"
          size="sm"
          width={150}
          content={buttonText}
          onClick={dispatchAction}
        />
      </div>
    );
  }

  renderRejectStyle(show, dispatchAction) {
    if (!(show)) {
      return null;
    }
    return (
      <div style={{ display: 'inline-block', width: 420, marginLeft: 20, verticalAlign: 'middle' }}>
        <div>
          <span>對於此預訂單有問題嗎？您可以提出修改並私訊享用人，請對方做修改喔!</span>
          <button
            style={{
              color: colors.activeColor,
              padding: 0,
              border: 'none',
              background: 'none',
            }}
            onClick={dispatchAction}
          >
            提出修改預訂單
          </button>
        </div>
      </div>
    );
  }
  renderOverdueRate(overdueRate, deposit) {
    if (!overdueRate || overdueRate <= 0) {
      return null;
    }

    const overdueRatePerDay = (overdueRate == null) ? 0 :
    ((deposit * overdueRate) / 100);

    return (
      <div styleName="section-content">
        <div styleName="section-header">逾期金政策</div>
        <div>
          <span>逾期1天，將從押金扣除</span>
          <span style={{ color: colors.colorHeart }}>{`NTD$${overdueRatePerDay}`}</span>
          <span>，扣除的總金額則取決於逾期的天數做累加計算</span>
        </div>
        <div styleName="padding-40btm-style" />
      </div>
    );
  }
  renderCancelPolicys(cancelPolicys) {
    if (!cancelPolicys || cancelPolicys.length <= 0) {
      return null;
    }
    return (
      <div styleName="section-content">
        <div styleName="section-header">退訂政策</div>
        <div>
          <span>開始租借前</span>
          <span style={{ color: colors.colorHeart }}>
            {cancelPolicys[0].advance_day}
          </span>
          <span>天取消訂單，扣除</span>
          <span style={{ color: colors.colorHeart }}>{`${cancelPolicys[0].rate}%`}</span>
          <span>金額</span>
        </div>
        <div styleName="padding-40btm-style" />
      </div>
    );
  }
  renderRules(rules) {
    if (!rules || rules.length <= 0) {
      return null;
    }

    return (
      <div styleName="section-content">
        <div styleName="section-header">分享人守則</div>
        <div>
          {
            rules.map((rule, i) =>
              <div key={`${rule.describe}_${i + 1}`}>{rule}</div>
          )}
        </div>
        <div styleName="padding-40btm-style" />
      </div>
    );
  }
  renderSchedule() {
    const { orderdetail } = this.props;
    const { order } = orderdetail;
    const { type, leasestart, leaseend,
      service_city, service_area, service_address,
      space_city, space_area, space_address,
     } = order;
    let titleStr = '';
    let hintStr = '';
    let address = null;
    switch (type) {
      case 'ITEM':
        titleStr = '使用時間';
        break;
      case 'SERVICE':
        titleStr = '服務資訊';
        address = `${service_city}${service_area}${service_address}`;
        hintStr = '同意預定後才,顯示完整以上資訊';
        break;
      case 'SPACE':
        titleStr = '空間資訊';
        address = `${space_city}${space_area}${space_address}`;
        hintStr = '同意預定後才,顯示完整以上資訊';
        break;
      default:
        break;
    }
    const totalDay = rangeDiff(leasestart, leaseend, true);
    return (
      <div styleName="section-content" className="clear">
        <div styleName="section-header">{titleStr}</div>
        { address &&
          <div>
            <div styleName="mini-icon-style">
              <IconLocation size={30} />
            </div>
            <div styleName="mini-icon-text-style">
              { `詳細地址：${address}`}
            </div>
          </div>
        }
        <div>
          <div styleName="mini-icon-style">
            <IconCalendar size={30} />
          </div>
          <div styleName="mini-icon-text-style">
            { `使用日期：${formatDate(leasestart)}~${formatDate(leaseend)}(共${totalDay}天)`}
          </div>
        </div>
        <div styleName="mini-icon-hint-style">{hintStr}</div>
      </div>
    );
  }

  renderImages() {
    const { orderdetail } = this.props;
    const { images } = orderdetail;
    if (!(images)) {
      return null;
    }
    const checkReady = array => (array && array.length > 0)
    const { beforeShip, afterShip, beforeReturn, afterReturn } = images;
    return (
      <div styleName="section-content" className="clear">
        <div styleName="section-header">拍照存證</div>
        { (checkReady(beforeShip)) &&
          <div style={{ marginLeft: 20 }}>
            <div>出貨前</div>
            <CoverThreePics images={beforeShip} />
          </div>
        }
        { (checkReady(afterShip)) &&
          <div style={{ marginLeft: 20 }}>
            <div>收貨後</div>
            <CoverThreePics images={afterShip} />
          </div>
        }
        { (checkReady(beforeReturn)) &&
          <div style={{ marginLeft: 20 }}>
            <div>還貨前</div>
            <CoverThreePics images={beforeReturn} />
          </div>
        }
        { (checkReady(afterReturn)) &&
          <div style={{ marginLeft: 20 }}>
            <div>還貨後</div>
            <CoverThreePics images={afterReturn} />
          </div>
        }
      </div>
    );
  }

  renderShippingDetail(order) {
    const { type, send_type, return_type } = order;
    if (type !== 'ITEM') {
      return null;
    }

    let showSecondLine = false;
    let sendTypeName = '';
    let sendDetail = '';
    let returnTypeName = '';
    let returnDetail = '';

    switch (send_type) {
      case '0':
        sendTypeName = '面交';
        sendDetail = ''
        break;
      case '1':
        sendTypeName = '自行寄送';
        showSecondLine = true;
        break;
      default:
        sendTypeName = '';
        sendDetail = '';
        break;
    }

    switch (return_type) {
      case '0':
        returnTypeName = '面交';
        returnDetail = ''
        break;
      case '1':
        returnTypeName = '自行寄送';
        showSecondLine = true;
        break;
      default:
        returnTypeName = '其他';
        returnDetail = ''
    }

    return (
      <div styleName="section-content">
        <div styleName="section-header">物流方式</div>
        <div>
          <div style={{ position: 'relative' }}>
            <div styleName="half-width-style">{ `到貨方式: ${sendTypeName}` }</div>
            <div styleName="half-width-style">{ `還貨方式: ${returnTypeName}` }</div>
          </div>
          { showSecondLine &&
            <div style={{ position: 'relative', paddingTop: 10 }}>
              <div styleName="half-width-style">{ sendDetail }</div>
              <div styleName="half-width-style">{ returnDetail }</div>
            </div>
          }
        </div>
        <div styleName="padding-40btm-style" />
      </div>
    );
  }
  renderAcceptHint(contractstage) {
    if (contractstage !== 1) {
      return null;
    }
    return (
      <div style={{ paddingBottom: 50, paddingTop: 20, fontSize: 16, fontWeight: 400 }}>
        備註：請盡快同意！
      </div>
    );
  }
  renderBankInfo(contractstage){
    if (contractstage > 4) {
      return null;
    }
    const { personalBankInfo } = this.props;
    const { isReady, isChecked } = personalBankInfo;

    if (isChecked === false) {
      return (<div style={{ height: 128 }} />);
    }
    return (
      <div>
        { (isReady) ?
          <div style={{ display: 'inline-block', color: colors.blackColor }}>設定銀行帳戶</div> :
          <div style={{ display: 'inline-block', color: colors.colorHeart }}>您尚未設定銀行帳戶喔！</div>
        }
        <div style={{ display: 'inline-block', marginLeft: 20 }}>
          <FormButton
            colorType="greenBorder"
            size="sm"
            width={120}
            content="前往設定"
            onClick={this.props.dispatchBankSetup}
          />
        </div>
        <div style={{ color: colors.placeholder, paddingTop: 20, paddingBottom: 50 }}>
          當交易完成後，銀行會在每週一、三，將您的收入款項轉帳至您的銀行帳戶
        </div>
      </div>
    )
  }

  renderBanner(order, isOwner, dispatch) {
    const { contractstage, cid, type, leasestart } = order;
    if (contractstage < 1000) {
      return (
        <div styleName="banner_style" >
          <Banner
            cid={cid}
            type={type}
            contractstage={contractstage}
            isOwner={isOwner}
            startDate={leasestart}
            dispatch={dispatch}
          />
        </div>
      );
    } else if (contractstage > 1000 && contractstage < 3000) {
      if (!(this.props.orderdetail.sueDetail)) {
        return null;
      }
      return (
        <div styleName="banner_style" >
          <SueBanner
            sueDetail={this.props.orderdetail.sueDetail}
            cid={cid}
            contractstage={contractstage}
            dispatch={dispatch}
          />
        </div>
      );
    }
    return null;
  }

  renderMiniMap(order) {
    const { img1, cid_no, pname } = order;
    return (
      <div styleName="top_40px_style">
        <MiniMap
          cover={`${img1}`}
          cidNumber={`合約編號：${cid_no}`}
          itemName={`${pname}`}
        />
      </div>
    );
  }

  render() {
    const { orderdetail, dispatch } = this.props;
    const { order } = orderdetail;
    if (order == null) {
      return null;
    }
    // console.log(this.props);
    const { display } = order;
    const { ownerProfile, lesseeProfile } = orderdetail;

    const ownerPicture = ownerProfile ? ownerProfile.picture : null;
    const lesseePicture = lesseeProfile ? lesseeProfile.picture : null;

    let dispatchEnd = () => {};
    if (order.type === 'SERVICE') {
      dispatchEnd = this.props.dispatchEndService;
    } else if (order.type === 'SERVICE') {
      dispatchEnd = this.props.dispatchEndSpace;
    }

    const targetName = display.is_owner ? order.lessee_nick_name : order.owner_nick_name;
    const targetRealName = display.is_owner ? order.lessee_real_name : order.owner_real_name;
    const targetPhone = display.is_owner ? order.lesseephone : order.ownerphone;
    const targetUrl = display.is_owner ? lesseePicture : ownerPicture;
    const targetComment = display.is_owner ? order.lessee_comment : order.owner_comment;
    const targetScore = display.is_owner ? order.lesseescore : order.ownerscore;

    return (
      <div>
        <form action="https://acqtest.esunbank.com.tw/ACQTrans/esuncard/txnf014m">
          <input type="submit" />
        </form>
        <div styleName="container">
          <div styleName="header">
            <h1 styleName="title">
              <span styleName="text">訂單詳情</span>
            </h1>
          </div>
          <div styleName="section-content">
            {this.renderBanner(order, display.is_owner, dispatch)}
            {this.renderMiniMap(order)}
            <div styleName="top_40px_style">
              <UserInfoBoard
                cid={order.cid}
                contractstage={order.contractstage}
                dispatch={dispatch}
                realname={targetRealName}
                imgUrl={targetUrl}
                phone={targetPhone}
              />
            </div>
          </div>
          {this.renderSchedule()}
          {this.renderImages()}
          {this.renderShippingDetail(order)}
          <div styleName="section-content">
            <div styleName="section-header">交易明細</div>
            <BillingDetail {...calculateService(order, null)} />
            {this.renderAcceptHint(order.contractstage)}
            {this.renderBankInfo(order.contractstage)}
          </div>
          {this.renderRules(order.rules)}
          {this.renderCancelPolicys(order.cancel_policys)}
          {this.renderOverdueRate(order.overdue_rate, order.deposit)}
        </div>
        <div style={{ height: 130 }}>
          {this.renderButtonStyle(display.can_cancel,
            this.props.dispatchCancel,
            display.is_owner ? '目前無法接單' : '取消訂單')}
          {this.renderButtonStyle(display.can_accept,
            this.props.dispatchAccept,
            '我同意此預訂')}
          {this.renderButtonStyle(display.can_edit,
            () => {},
            '修改訂單')}
          {this.renderButtonStyle(display.can_pay,
            this.getPaymentAction(order),
            '付款')}
          {this.renderButtonStyle(display.can_camera,
            () => {},
            '拍照')}
          {this.renderButtonStyle(display.can_ship,
            this.props.dispatchShipGoods,
            '確認出貨')}
          {this.renderButtonStyle(display.can_ship_confirm,
            () => this.props.dispatchReceiveConfirm,
            '確認收貨')}
          {this.renderButtonStyle(display.can_return,
            this.props.dispatchReturn,
            '確認還貨')}
          {this.renderButtonStyle(display.can_return_confirm,
            () => this.props.dispatchReceiveConfirm,
            '確認收貨')}
          {this.renderButtonStyle(display.can_owner_end,
            dispatchEnd,
            '確認結束')}
          {this.renderButtonStyle(display.can_lessee_end,
            dispatchEnd,
            '確認結束')}
          {this.renderButtonStyle(display.can_score,
            () => this.props.dispatchPopupScore(false, targetName,
              null, null, targetUrl),
            '評價')}
          {this.renderButtonStyle(display.view_score,
            () => this.props.dispatchPopupScore(true, targetName,
              targetScore, targetComment, targetUrl),
            '查看評價')}
          {this.renderRejectStyle(display.can_reject,
            this.props.dispatchReject)}
        </div>
      </div>
    );
  }
}
export default CSS(Orderdetail, styles);
