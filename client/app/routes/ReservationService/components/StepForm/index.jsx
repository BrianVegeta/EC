/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import {
  find,
} from 'lodash';

// import myPropTypes from 'propTypes';
import FormContainer from 'components/Publish/FormContainer';
import ConfirmTitle from 'components/Publish/ConfirmTitle';
import ReservationItemNote from 'components/ReservationItemNote';
import FormGroup from 'components/Form/Group';
import InputDatesPicker from 'components/Input/DatesPicker';
import InputSelectionCoupons from 'components/Input/SelectionCoupons';
import InputSelection from 'components/Input/Selection';
import BillingDetail, { calculateService } from 'components/BillingDetail';
import InputSelectionCitiesContainer from 'components/Input/SelectionCities/Container';
import InputText from 'components/Input/Text';
import constraints from 'constraints/publish';

import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_VALID,
} from 'components/Button/NextStep';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import { DangerText } from './styles';
import {
  CHARGE_TYPE_FIX,
  CHARGE_TYPE_DAY,
  CHARGE_TYPE_COUNT,
  ASSIGN_ADDRESS_BY_OWNER,
  ASSIGN_ADDRESS_BY_CUSTOMER,
} from '../../modules/reservationItem';


class StepForm extends React.Component {

  static propTypes = {
    dpFetchCoupons: PropTypes.func.isRequired,
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchTouchPath: PropTypes.func.isRequired,

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
    nextStep: PropTypes.func.isRequired,
  };

  static getCouponOffset({ couponNo, reservationCoupons }) {
    if (!couponNo) return null;
    const coupon = find(reservationCoupons.records, { id: couponNo });
    return coupon ? coupon.amount : null;
  }

  static getUnit(type) {
    switch (type) {
      case CHARGE_TYPE_FIX: return '次';
      case CHARGE_TYPE_DAY: return '天';
      case CHARGE_TYPE_COUNT: return '人';
      default: return '';
    }
  }

  constructor(props) {
    super(props);
    this.onNextStepClick = this.onNextStepClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatchTouchPath();
    this.props.dpFetchCoupons();
  }

  onNextStepClick() {
    const {
      nextStep,
    } = this.props;
    nextStep();
    // dispatchValidate()
    // .then(() => {
    //   nextStep();
    // })
    // .catch((errors) => {
    //   const { chargeTypeError, totalError } = errors;
    //
    //   this.setState({ chargeTypeError: chargeTypeError || '' });
    //   if (chargeTypeError) return;
    //
    //   this.setState({ totalError: totalError || '' });
    //   this.priceInput.valid();
    //   this.depositInput.valid();
    //   if (this.datesInput) this.datesInput.valid();
    //   if (this.unitInput) this.unitInput.valid();
    //   if (this.reservationDaysInput) this.reservationDaysInput.valid();
    //   this.discountInput.valid();
    // });
  }

  renderDatesPicker(
    { leasestart, leaseend },
    { advance_reservation_days },
  ) {
    const { dispatchChangeData } = this.props;
    const advanceDays = <DangerText>提前{advance_reservation_days}天</DangerText>;
    const helperBottom = advance_reservation_days ?
        (<span>請{advanceDays}預約</span>) : null;

    return (
      <FormGroup
        headerText={'服務時間'}
        helperBottom={helperBottom}
      >
        <InputDatesPicker
          startDate={leasestart}
          endDate={leaseend}
          onDatesChange={({ startDate, endDate }) =>
            dispatchChangeData({ leasestart: startDate, leaseend: endDate })
          }
          preparation={advance_reservation_days}
          value={leasestart && leaseend && 'date'}
          constraints={constraints.serviceDates}
          validateOnBlur
        />
      </FormGroup>
    );
  }

  renderCoupons({ couponNo }) {
    const {
      dispatchChangeData,
      reservationCoupons,
    } = this.props;

    return (
      <FormGroup>
        <div styleName="coupons-container">
          <InputSelectionCoupons
            ref={selectionCoupon => (this.selectionCoupon = selectionCoupon)}
            couponNo={couponNo}
            options={reservationCoupons.records}
            onSelect={({ value }) => dispatchChangeData({ couponNo: value })}
          />
        </div>
      </FormGroup>
    );
  }

  renderBillingDetail(
    { leasestart, leaseend, unit, couponNo },
    { calculate_charge_type, price, deposit, discounts },
  ) {
    const { reservationCoupons } = this.props;
    const { getCouponOffset } = this.constructor;
    const calculateParams = {
      calculate_charge_type,
      price,
      deposit,
      discounts,
      leasestart,
      leaseend,
      unit,
    };
    const couponOffset = getCouponOffset({ couponNo, reservationCoupons });
    const props = calculateService(calculateParams, couponOffset);

    return <BillingDetail {...props} />;
  }

  /**
   *
   * 服務指定地址
   *
   */
  renderAssignAddress({ serviceCity, serviceArea, serviceAddress }) {
    const { dispatchChangeData } = this.props;
    return (
      <div styleName="assign-address">
        <div styleName="city-area-container">
          <InputSelectionCitiesContainer
            ref={serviceCityAreaInput => (
              this.serviceCityAreaInput = (
                serviceCityAreaInput && serviceCityAreaInput.getWrappedInstance()
              )
            )}
            cityName={serviceCity}
            areaName={serviceArea}
            value={`${serviceCity}${serviceArea}`}
            onSelect={city => dispatchChangeData({
              serviceCity: city.cityName,
              serviceArea: city.areaName,
            })}
            constraints={constraints.cityArea}
            validateOnBlur
          />
        </div>
        <InputText
          ref={serviceAddressInput => (
            this.serviceAddressInput = serviceAddressInput
          )}
          placeholder="請輸入詳細地址"
          onChange={value => dispatchChangeData({ serviceAddress: value })}
          value={serviceAddress}
          constraints={constraints.address}
          validateOnBlur
        />
      </div>
    );
  }

  /**
   *
   * 指定方式服務
   *
   */
  renderAssign(
    { assign_address_type, assign_city, assign_area },
    { serviceLocationType, serviceCity, serviceArea, serviceAddress },
  ) {
    const { dispatchChangeData } = this.props;

    const byOwner = assign_address_type.includes(ASSIGN_ADDRESS_BY_OWNER);
    const byCustomer = assign_address_type.includes(ASSIGN_ADDRESS_BY_CUSTOMER);

    if (byOwner && !byCustomer) {
      return (
        <div styleName="assign-container">
          <FormGroup helperBottom="當分享人同意您的預定時，您將會收到確切的服務地址。">
            <div styleName="assign-type">到店服務</div>
            <div styleName="assign-content">
              <span styleName="address-label">地點：</span>
              <span styleName="address">{assign_city}{assign_area}</span>
            </div>
          </FormGroup>
        </div>
      );
    }

    if (!byOwner && byCustomer) {
      return (
        <div styleName="assign-container">
          <FormGroup>
            <div styleName="assign-type">到府服務</div>
            <div styleName="assign-content">
              <FormGroup
                headerText="指定地址"
                helperBottom="當分享人同意您的預定後，您的地址才會被分享人知道。"
              >
                {this.renderAssignAddress({ serviceCity, serviceArea, serviceAddress })}
              </FormGroup>
            </div>
          </FormGroup>
        </div>
      );
    }

    return (
      <div styleName="assign-container">
        <InputSelection
          options={[
            { value: ASSIGN_ADDRESS_BY_OWNER, text: '親自前往' },
            { value: ASSIGN_ADDRESS_BY_CUSTOMER, text: '到府服務' },
          ]}
          value={serviceLocationType}
          onSelect={({ value }) => dispatchChangeData({ serviceLocationType: value })}
        />
      </div>
    );
  }

  renderDetail(chargeType) {
    const { reservation, reservationItem } = this.props;

    switch (chargeType) {
      case CHARGE_TYPE_FIX: {
        return (
          <ConfirmTitle title="交易明細" >
            <div>##### {CHARGE_TYPE_FIX} #####</div>
            <div>活動時間</div>
            {this.renderCoupons(reservation)}
            {this.renderBillingDetail(reservation, reservationItem)}
          </ConfirmTitle>
        );
      }

      case CHARGE_TYPE_DAY: {
        return (
          <ConfirmTitle title="交易明細" >
            <div>##### {CHARGE_TYPE_DAY} #####</div>
            {this.renderDatesPicker(reservation, reservationItem)}
            {this.renderCoupons(reservation)}
            {this.renderBillingDetail(reservation, reservationItem)}
          </ConfirmTitle>
        );
      }

      case CHARGE_TYPE_COUNT: {
        return (
          <ConfirmTitle title="交易明細" >
            <div>##### {CHARGE_TYPE_COUNT} #####</div>
            {this.renderDatesPicker(reservation, reservationItem)}
            {'數量'}
            {this.renderCoupons(reservation)}
            {this.renderBillingDetail(reservation, reservationItem)}
          </ConfirmTitle>
        );
      }

      default:
        throw new Error('WRONG TYPE');
    }
  }

  render() {
    const {
      isValid,
      isFetched,
      reservationItem,
      reservation,
    } = this.props;

    const {
      pname,
      img1,
      price,
      calculate_charge_type,
      owner,
    } = reservationItem;

    if (!isFetched) return null;

    return (
      <FormContainer title="填寫預訂資訊" >
        <div styleName="header-note-container">
          <ReservationItemNote
            img1={img1}
            pname={pname}
            price={price}
            unit={this.constructor.getUnit(calculate_charge_type)}
          />
        </div>
        {this.renderDetail(calculate_charge_type)}
        <ConfirmTitle title="服務方式" >
          {this.renderAssign(reservationItem, reservation)}
        </ConfirmTitle>
        <ButtonNextStep
          status={isValid ? STATUS_VALID : STATUS_DISABLE}
          onClick={this.onNextStepClick}
        />
      </FormContainer>
    );
  }
}

export default CSS(StepForm, styles);
