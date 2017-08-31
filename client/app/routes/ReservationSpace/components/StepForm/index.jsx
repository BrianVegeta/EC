/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
// import myPropTypes from 'propTypes';
import {
  find,
} from 'lodash';
// import colors from 'styles/colorExport.scss';
// import IconLocation from 'react-icons/lib/md/location-on';
import FormContainer from 'components/Publish/FormContainer';
import ConfirmTitle from 'components/Publish/ConfirmTitle';
import ReservationItemNote from 'components/ReservationItemNote';
import FormGroup from 'components/Form/Group';
import SingleDatePicker from 'components/Input/SingleDatePicker';
import InputDatesPicker from 'components/Input/DatesPicker';
import InputSelectionCoupons from 'components/Input/SelectionCoupons';
import InputSelection from 'components/Input/Selection';
import BillingDetail, { calculateService } from 'components/BillingDetail';
import InputSelectionCitiesContainer from 'components/Input/SelectionCities/Container';
import InputText from 'components/Input/Text';
import InputTextArea from 'components/Input/TextArea';
import InputTextCounter from 'components/Input/TextCounter';
import constraints from 'constraints/reservation';
// import { formatDate, rangeDiff } from 'lib/time';

import ButtonNextStep, {
  STATUS_DISABLE,
  STATUS_VALID,
} from 'components/Button/NextStep';

import CSS from 'react-css-modules';
import {
  CHARGE_TYPE_DAY,
  CHARGE_TYPE_MONTH,
} from 'constants/publishTypes';
import styles from './styles.sass';
import { DangerText } from './styles';

import {
  ASSIGN_ADDRESS_BY_OWNER,
  ASSIGN_ADDRESS_BY_CUSTOMER,
} from '../../modules/reservationItem';


class StepForm extends React.Component {

  static propTypes = {
    dpFetchCoupons: PropTypes.func.isRequired,
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchChangeMonth: PropTypes.func.isRequired,
    dispatchTouchPath: PropTypes.func.isRequired,
    dispatchValidate: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,

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

  static getCouponOffset({ couponNo, reservationCoupons: { records } }) {
    if (!couponNo) return null;
    const coupon = find(records, { coupon_no: couponNo });
    return coupon ? coupon.amount : null;
  }

  static getUnit(type) {
    switch (type) {
      case CHARGE_TYPE_DAY: return '天';
      case CHARGE_TYPE_MONTH: return '月';
      default: return '';
    }
  }

  /**
   *
   * 到店服務
   *
   */
  static renderAssignByOwner({ assign_city, assign_area }) {
    return (
      <FormGroup helperBottom="當分享人同意您的預定時，您將會收到確切的服務地址。">
        <div styleName="assign-content">
          <span styleName="address-label">地點：</span>
          <span styleName="address">{assign_city}{assign_area}</span>
        </div>
      </FormGroup>
    );
  }

  constructor(props) {
    super(props);
    this.onNextStepClick = this.onNextStepClick.bind(this);

    this.couponInput = null;
    this.datesInput = null;
    this.unitInput = null;
    this.serviceCityAreaInput = null;
    this.serviceAddressInput = null;
    this.serviceLocationTypeInput = null;
    this.noteInput = null;
  }

  componentDidMount() {
    this.props.dispatchTouchPath();
    this.props.dpFetchCoupons();
  }

  onNextStepClick() {
    const { nextStep, dispatchValidate } = this.props;

    dispatchValidate()
    .then(() => nextStep())
    .catch(() => {
      if (this.datesInput) this.datesInput.valid();
      if (this.unitInput) this.unitInput.valid();
      if (this.serviceCityAreaInput) this.serviceCityAreaInput.valid();
      if (this.serviceAddressInput) this.serviceAddressInput.valid();
      if (this.serviceLocationTypeInput) this.serviceLocationTypeInput.valid();
      this.noteInput = null;
    });
  }

  /**
   *
   * 選擇日期
   *
   */
  renderDatesPicker(
    { leasestart, leaseend },
    { advance_reservation_days },
  ) {
    const { dispatchChangeData } = this.props;
    const advanceDays = <DangerText>提前{advance_reservation_days}天</DangerText>;
    const helperBottom = advance_reservation_days ?
        (<span>請{advanceDays}預約</span>) : null;

    const ref = datesInput => (this.datesInput = datesInput);
    const onDatesChange = ({ startDate, endDate }) =>
      dispatchChangeData({ leasestart: startDate, leaseend: endDate });

    return (
      <FormGroup
        headerText={'租借時間'}
        helperBottom={helperBottom}
      >
        <InputDatesPicker
          ref={ref}
          startDate={leasestart}
          endDate={leaseend}
          onDatesChange={onDatesChange}
          preparation={advance_reservation_days}
          value={leasestart && leaseend && 'date'}
          constraints={constraints.dates}
          validateOnBlur
        />
      </FormGroup>
    );
  }

  renderSingleDatesPicker(
    { leasestart, leaseend },
    { advance_reservation_days, earliestStart },
  ) {
    const { dispatchChangeMonth } = this.props;
    const advanceDays = <DangerText>提前{advance_reservation_days}天</DangerText>;
    const helperBottom = advance_reservation_days ?
        (<span>請{advanceDays}預約</span>) : null;

    const ref = datesInput => (this.datesInput = datesInput);
    const onMonthDateChange = ({ startDate }) => dispatchChangeMonth(startDate, null);

    return (
      <FormGroup
        headerText={'開始時間'}
        helperBottom={helperBottom}
      >
        <SingleDatePicker
          ref={ref}
          startDate={leasestart}
          earliestStart={earliestStart}
          onDatesChange={onMonthDateChange}
        />
      </FormGroup>
    );
  }

  /**
   *
   * 選擇折價券
   *
   */
  renderCoupons({ couponNo }) {
    const {
      dispatchChangeData,
      reservationCoupons: { records: myCouponList },
    } = this.props;

    return (
      <FormGroup>
        <div styleName="coupons-container">
          <InputSelectionCoupons
            couponNo={couponNo}
            options={myCouponList}
            onSelect={({ value }) => dispatchChangeData({ couponNo: value })}
          />
        </div>
        {
          couponNo &&
            <button
              className="button"
              styleName="coupon-cancel"
              onClick={() => dispatchChangeData({ couponNo: null })}
            >
              X 取消折價券
            </button>
        }
      </FormGroup>
    );
  }

  /**
   *
   * 計算帳目
   *
   */
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
  renderAssignAddress(
    { serviceCity, serviceArea, serviceAddress },
    renderOption = false,
  ) {
    const { dispatchChangeData } = this.props;
    const refServiceCityArea = cityArea => (
      this.serviceCityAreaInput = cityArea && cityArea.getWrappedInstance()
    );
    const refServiceAddress = address => (this.serviceAddressInput = address);
    const onCitiesSelect = ({ cityName, areaName }) => dispatchChangeData({
      serviceCity: cityName, serviceArea: areaName,
    });

    return (
      <FormGroup>
        {renderOption && <div styleName="assign-type">到府服務</div>}
        <div styleName="assign-content">
          <FormGroup
            headerText="指定地址"
            helperBottom="當分享人同意您的預定後，您的地址才會被分享人知道。"
          >
            <div styleName="assign-address">
              <div styleName="city-area-container">
                <InputSelectionCitiesContainer
                  ref={refServiceCityArea}
                  cityName={serviceCity}
                  areaName={serviceArea}
                  value={`${serviceCity}${serviceArea}`}
                  onSelect={onCitiesSelect}
                  constraints={constraints.cityArea}
                  validateOnBlur
                />
              </div>
              <InputText
                ref={refServiceAddress}
                placeholder="請輸入詳細地址"
                onChange={value => dispatchChangeData({ serviceAddress: value })}
                value={serviceAddress}
                constraints={constraints.address}
                validateOnBlur
              />
            </div>
          </FormGroup>
        </div>
      </FormGroup>
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

    const ownerContain = assign_address_type.includes(ASSIGN_ADDRESS_BY_OWNER);
    const customerContain = assign_address_type.includes(ASSIGN_ADDRESS_BY_CUSTOMER);
    const storeServiceParams = { assign_city, assign_area };
    const homeServoceParams = { serviceCity, serviceArea, serviceAddress };

    const byOwner = ownerContain && !customerContain;
    const byCustomer = !ownerContain && customerContain;
    const selectable = ownerContain && customerContain;

    const options = [
      { value: ASSIGN_ADDRESS_BY_OWNER, text: '親自前往' },
      { value: ASSIGN_ADDRESS_BY_CUSTOMER, text: '到府服務' },
    ];
    const onServiceLocatonSelect = ({ value }) =>
      dispatchChangeData({ serviceLocationType: value });
    const renderSelectedDetail = () => {
      switch (serviceLocationType) {
        case ASSIGN_ADDRESS_BY_OWNER:
          return this.constructor.renderAssignByOwner(storeServiceParams, false);

        case ASSIGN_ADDRESS_BY_CUSTOMER:
          return this.renderAssignAddress(homeServoceParams, false);

        default:
          return null;
      }
    };
    const refServiceLocationType = input => (this.serviceLocationTypeInput = input);

    return (
      <div styleName="assign-container">
        {byOwner && this.constructor.renderAssignByOwner(storeServiceParams, true)}
        {byCustomer && this.renderAssignAddress(homeServoceParams, true)}
        {selectable &&
          <div>
            <div styleName="service-location-container">
              <InputSelection
                ref={refServiceLocationType}
                options={options}
                value={serviceLocationType}
                onSelect={onServiceLocatonSelect}
                constraints={constraints.serviceLocationType}
                validateOnBlur
              />
            </div>
            {renderSelectedDetail()}
          </div>
        }
      </div>
    );
  }

  /**
   *
   * 備註
   *
   */
  renderNote({ note }) {
    const { dispatchChangeData } = this.props;
    const refNoteInput = noteInput => (this.noteInput = noteInput);

    return (
      <InputTextArea
        ref={refNoteInput}
        placeholder="有什麼需要跟分享人說的？"
        onChange={value => dispatchChangeData({ note: value })}
        value={note}
        minHeight={150}
        constraints={constraints.note}
        validateOnBlur
      />
    );
  }

  /**
   *
   * 數量設定
   *
   */
  renderMonth({ month }) {
    const { dispatchChangeMonth } = this.props;
    const refMonthInput = monthInput => (this.monthInput = monthInput);
    const inputValue = month ? String(month) : '';

    return (
      <FormGroup
        headerText="選擇月數"
      >
        <InputTextCounter
          ref={refMonthInput}
          value={inputValue}
          suffix="月"
          placeholder="請輸入"
          min={1}
          max={12}
          onChange={value => dispatchChangeMonth(null, value)}
          validateOnBlur
        />
      </FormGroup>
    );
  }

  renderDetailDiff(chargeType) {
    const { reservation, reservationItem } = this.props;
    switch (chargeType) {
      // case CHARGE_TYPE_FIX: {
      //   const { leasestart, leaseend } = reservationItem;
      //   const totalDays = rangeDiff(leasestart, leaseend, true);
      //   return (
      //     <div styleName="duration-container">
      //       <span styleName="label">活動時間：</span>
      //       <span styleName="time">
      //         {
      //           totalDays > 1 ?
      //           `${formatDate(leasestart)} - ${formatDate(leaseend)}（共 ${totalDays} 天）` :
      //           `${formatDate(leasestart)}`
      //         }
      //       </span>
      //     </div>
      //   );
      // }
      //
      // case CHARGE_TYPE_DAY:
      //   return (
      //     <div styleName="dates-picker-container">
      //       {this.renderDatesPicker(reservation, reservationItem)}
      //     </div>
      //   );

      case CHARGE_TYPE_DAY: {
        return (
          <div>
            <div styleName="dates-picker-container">
              {this.renderDatesPicker()}
            </div>
          </div>
        );
      }

      case CHARGE_TYPE_MONTH: {
        return (
          <div>
            <div styleName="count-container">
              {this.renderMonth(reservation)}
            </div>
            <div styleName="dates-picker-container">
              {this.renderSingleDatesPicker(reservation, reservationItem)}
            </div>
          </div>
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
      reservationItem: item,
      reservation,
    } = this.props;

    const {
      pname,
      img1,
      price,
      calculate_charge_type,
    } = item;

    if (!isFetched) return null;
    return (
      <FormContainer title="填寫預訂資訊" >
        <div styleName="header-note-container">
          <ReservationItemNote
            {...{ pname, img1, price }}
            unit={this.constructor.getUnit(calculate_charge_type)}
          />
        </div>
        <ConfirmTitle title="交易明細" >
          <div styleName="detail-container">
            {this.renderDetailDiff(calculate_charge_type)}
            {this.renderCoupons(reservation)}
            {this.renderBillingDetail(reservation, item)}
          </div>
        </ConfirmTitle>
        <ConfirmTitle title="租借資訊" >
          {this.renderAssign(item, reservation)}
        </ConfirmTitle>
        <ConfirmTitle title="備註" >
          {this.renderNote(reservation)}
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