/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { find, isEmpty } from 'lodash';
import IconCalendar from 'react-icons/lib/fa/calendar';
import ReservationItemNote from 'components/ReservationItemNote';
import OwnerInfoNote from 'components/OwnerInfoNote';
import InputCheckBox from 'components/Input/CheckBox';
import BillingDetail, { calculateService } from 'components/BillingDetail';
import FormContainer from 'components/Publish/FormContainer';
import ConfirmTitle from 'components/Publish/ConfirmTitle';
import AlertPanel from 'components/Alert/Panel';
import ButtonNextStep, {
  STATUS_DISABLE, STATUS_VALID,
} from 'components/Button/NextStep';
import { htmlNewLineToBreak } from 'lib/htmlUtils';
import { formatDate, rangeDiff } from 'lib/time';
import CSS from 'react-css-modules';
import {
  CHARGE_TYPE_DAY,
  CHARGE_TYPE_MONTH,
} from 'constants/publishTypes';

import styles from './styles.sass';

import {
  SEND_BY_IN_PERSON,
  SEND_BY_OTHER_SHIPPMENT,
  RETURN_BY_IN_PERSON,
  RETURN_BY_OTHER_SHIPPMENT,
  ASSIGN_ADDRESS_BY_OWNER,
  ASSIGN_ADDRESS_BY_CUSTOMER,
} from '../../modules/reservationItem';
import {
  PAYMENT_TYPE_ATM,
  PAYMENT_TYPE_CREDIT_CARD,
} from '../../modules/reservation';
import RenderAssignOwner from '../RenderAssign/Owner';
import RenderAssignCustomer from '../RenderAssign/Customer';


// const cx = classnames.bind(styles);
class StepConfirm extends React.Component {

  static defaultProps = {
    categories: null,
  };

  static propTypes = {
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchTouchPath: PropTypes.func.isRequired,
    dispatchFetchCoupons: PropTypes.func.isRequired,
    dispatchValidate: PropTypes.func.isRequired,
    dispatchValidateAll: PropTypes.func.isRequired,
    dispatchSaveReservation: PropTypes.func.isRequired,
    redirectToMyOrder: PropTypes.func.isRequired,
    routingHelper: PropTypes.shape({
      removeHook: PropTypes.func.isRequired,
    }).isRequired,
    reservation: PropTypes.shape({
      title: PropTypes.string,
    }).isRequired,
    reservationItem: PropTypes.shape({
      owner: PropTypes.object,
    }).isRequired,
    reservationCoupons: PropTypes.shape({
      records: PropTypes.array.isRequired,
    }).isRequired,
    isFetched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
  };

  static getCouponOffset({ couponNo, reservationCoupons }) {
    if (!couponNo) return null;
    const coupon = find(reservationCoupons.records, { id: couponNo });
    return coupon ? coupon.amount : null;
  }

  constructor(props) {
    super(props);
    this.onNextStepClick = this.onNextStepClick.bind(this);
    this.state = {
      agreeError: '',
    };
  }

  componentDidMount() {
    this.props.dispatchTouchPath();
    this.props.dispatchFetchCoupons();
  }

  onNextStepClick() {
    const {
      dispatchSaveReservation,
      dispatchValidate,
      dispatchValidateAll,
      redirectToMyOrder,
      routingHelper: { removeHook },
    } = this.props;
    dispatchValidate().then(() => {
      this.setState({ agreeError: '' });
      dispatchValidateAll().then(() => {
        dispatchSaveReservation().then(() => {
          if (removeHook) removeHook();
          redirectToMyOrder();
        }).catch((error) => {
          console.warn(error);
        });
      }).catch(() => {
        alert('資料尚未填寫完整');
      });
    }).catch((errors) => {
      this.setState({ agreeError: errors.agree || '' });
    });
  }

  renderBillingDetail(
    { leasestart, leaseend, unit, couponNo },
    { calculate_charge_type, price, deposit, discounts },
  ) {
    const { reservationCoupons } = this.props;
    const { getCouponOffset } = this.constructor;
    const props = calculateService({
      calculate_charge_type,
      price,
      deposit,
      discounts,
      leasestart,
      leaseend,
      unit,
    }, getCouponOffset({ couponNo, reservationCoupons }));
    return <BillingDetail {...props} />;
  }

  /* 服務方式 */
  renderSendType() {
    const { reservation } = this.props;
    const { sendCity, sendArea, sendAddress,
      sendType } = reservation;
    switch (sendType) {
      case SEND_BY_IN_PERSON:
        return (
          <div styleName="return-container">
            <div styleName="return-type">
              <span styleName="return-type-title">到貨方式：</span>
              <span styleName="return-type-text">面交（自行協調取貨地點）</span>
            </div>
          </div>
        );
      case SEND_BY_OTHER_SHIPPMENT:
        return (
          <div styleName="return-container">
            <div styleName="return-type">
              <span styleName="return-type-title">到貨方式：</span>
              <span styleName="return-type-text">自行寄送</span>
            </div>
            <div styleName="return-type">
              <span styleName="return-type-title">地址：</span>
              <span styleName="return-type-text">{sendCity}{sendArea}{sendAddress}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  }
  renderReturnType() {
    const { reservation } = this.props;
    const { returnCity, returnArea,
      returnType } = reservation;
    switch (returnType) {
      case SEND_BY_IN_PERSON:
        return (
          <div styleName="return-container">
            <div styleName="return-type">
              <span styleName="return-type-title">寄還方式：</span>
              <span styleName="return-type-text">面交（自行協調取貨地點）</span>
            </div>
          </div>
        );
      case SEND_BY_OTHER_SHIPPMENT:
        return (
          <div styleName="return-container">
            <div styleName="return-type">
              <span styleName="return-type-title">寄還方式：</span>
              <span styleName="return-type-text">自行寄送</span>
            </div>
            <div styleName="return-type">
              <span styleName="return-type-title">地址：</span>
              <span styleName="return-type-text">{returnCity}{returnArea}</span>
            </div>
            <div styleName="return-hint">當您提交預訂單後，分享人會提供給您寄還的地點</div>
          </div>
        );
      default:
        return null;
    }
  }


  /* 支付方式 */
  renderPaymentType() {
    const { reservation: { paymenttype } } = this.props;
    switch (paymenttype) {
      case PAYMENT_TYPE_ATM:
        return (<div styleName="payment-type-container">ATM 銀行轉帳</div>);
      case PAYMENT_TYPE_CREDIT_CARD:
        return (<div styleName="payment-type-container">信用卡</div>);
      default:
        return '尚未選擇';
    }
  }

  renderDates() {
    const { reservation } = this.props;
    const { leasestart, leaseend } = reservation;
    if (!leasestart || !leaseend) return '尚未填寫';
    const totalDays = rangeDiff(leasestart, leaseend, true);
    return totalDays > 1 ?
      `${formatDate(leasestart)} - ${formatDate(leaseend)}（共 ${totalDays} 天）`
      : `${formatDate(leasestart)}`;
  }

  render() {
    const {
      dispatchChangeData,
      reservationItem,
      reservation,
      isFetched,
      isValid,
    } = this.props;
    if (!isFetched) return null;
    const {
      pname,
      img1,
      price,
      calculate_charge_type,
      rules,
      cancel_policys,
      owner: {
        uid,
        name,
        picture,
      },
    } = reservationItem;
    const {
      note,
      isAgree,
    } = reservation;
    const { agreeError } = this.state;
    return (
      <FormContainer title="填寫預訂資訊" >
        <div styleName="header-note-container">
          <ReservationItemNote
            {...{ pname, img1, price }}
            unit={{
              [CHARGE_TYPE_DAY]: '天',
              [CHARGE_TYPE_MONTH]: '月',
            }[calculate_charge_type]}
          />
          <OwnerInfoNote
            avatarSrc={picture}
            userId={uid}
            username={name}
            dispatchChat={() => console.log('chat')}
          />
          <div styleName="info-item">
            <div styleName="icon-container">
              <IconCalendar size={25} />
            </div>
            <div styleName="content-container">
              <span styleName="label">日期：</span>
              <span styleName="text">
                {this.renderDates(calculate_charge_type)}
              </span>
            </div>
          </div>
        </div>
        <div styleName="detail">
          <ConfirmTitle title="交易明細" >
            <div styleName="price-detail">
              {this.renderBillingDetail(reservation, reservationItem)}
            </div>
            {note && <div styleName="note">備註：{note}</div>}
          </ConfirmTitle>
        </div>
        <ConfirmTitle title="支付方式" >{this.renderPaymentType()}</ConfirmTitle>
        <ConfirmTitle title="交貨方式" >
          {this.renderSendType()}
          {this.renderReturnType()}
        </ConfirmTitle>
        {!isEmpty(rules) && rules[0] &&
          <ConfirmTitle title="分享人守則" >
            {htmlNewLineToBreak(rules[0])}
          </ConfirmTitle>
        }
        {!isEmpty(cancel_policys) && cancel_policys[0] &&
          <ConfirmTitle title="退訂政策" >
            開始租借「前{cancel_policys[0].advance_day}天」取消訂單，
            扣除<span styleName="danger">{cancel_policys[0].rate}</span>%分享金
          </ConfirmTitle>
        }
        <div styleName="confirm-agree">
          <InputCheckBox
            checked={isAgree}
            onChange={checked => dispatchChangeData({ isAgree: checked })}
          >
            <span styleName="agree-text">我已確定以上資訊</span>
          </InputCheckBox>
          {agreeError && !isAgree &&
            <div styleName="error">
              <AlertPanel text={agreeError} width="auto" />
            </div>
          }
        </div>
        <ButtonNextStep
          status={isValid ? STATUS_VALID : STATUS_DISABLE}
          onClick={this.onNextStepClick}
        />
      </FormContainer>
    );
  }
}

export default CSS(StepConfirm, styles);
